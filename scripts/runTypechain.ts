import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { glob, runTypeChain } from 'typechain'
import replace from 'replace-in-file'

const overrides = [
  'RegistrarController',
  'NameWrapper',
  'PublicResolver',
  'ReverseRegistrar',
  'StaticMetadataService',
  'UniversalResolver',
  'BulkRenewal',
]

async function replaceFIle() {
  replace.sync({
    files: 'src/generated/factories/*.ts',
    from: /import { Contract, Signer, utils } from "ethers";\n/g,
    to: 'import { Interface } from \'@ethersproject/abi\'\n' +
        'import { Signer } from \'@ethersproject/abstract-signer\'\n' +
        'import { Contract } from \'@ethersproject/contracts\'\n',
  })

  replace.sync({
    files: 'src/generated/factories/*.ts',
    from: /utils\.Interface\(_abi\)/g,
    to: 'Interface\(_abi\)',
  })

  replace.sync({
    files: 'src/generated/factories/*.ts',
    from: /from\ "/g,
    to: 'from\ \'',
  })

  replace.sync({
    files: 'src/generated/factories/*.ts',
    from: /";/g,
    to: '\'',
  })

  replace.sync({
    files: 'src/generated/factories/*.ts',
    from: /;\n/g,
    to: '\n',
  })
}

async function main() {
  const cwd = process.cwd()

  const contracts = path.resolve(cwd, './node_modules/@fildomains/fns-contracts')
  if (!fs.existsSync(contracts)) {
    throw new Error('@fildomains/fns-contracts not found')
  }

  if (!fs.existsSync('./cache/json-abis'))
    await fsp.mkdir('./cache/json-abis', { recursive: true })

  if (fs.existsSync('./src/generated'))
    await fsp.rm('./src/generated', { recursive: true, force: true })
  await fsp.mkdir('./src/generated')

  const overrideABIs = glob(cwd, [
    `${contracts}/artifacts/contracts/**/!(*.dbg).json`,
  ])

  const importABIs = glob(cwd, [
    `${contracts}/deployments/filecoin/+([a-zA-Z0-9_]).json`,
  ])

  for (const name of overrides) {
    const find = (f: string) => f.endsWith(`/${name}.json`)
    const i = importABIs.findIndex(find)
    if (i !== -1) importABIs[i] = overrideABIs.find(find)
    else importABIs.push(overrideABIs.find(find))
  }

  const copiedABIs: string[] = []

  for (const file of importABIs) {
    const dest = `${cwd}/cache/json-abis/${file.split('/').pop()}`

    const content = await fsp.readFile(file, 'utf8')
    const obj = JSON.parse(content) as Record<string, any>
    obj.bytecode = '0x'
    obj.deployedBytecode = '0x'
    await fsp.writeFile(dest, JSON.stringify(obj))

    copiedABIs.push(dest)
  }

  await runTypeChain({
    cwd,
    filesToProcess: copiedABIs,
    allFiles: copiedABIs,
    outDir: './src/generated',
    target: 'ethers-v5',
  })

  await replaceFIle()
}

main()
  .catch(console.error)
  .finally(async () => {
    if (fs.existsSync('./cache/json-abis'))
      await fsp.rm('./cache/json-abis', { recursive: true, force: true })
  })
