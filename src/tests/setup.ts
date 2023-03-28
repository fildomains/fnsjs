// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv'
import { ethers } from 'ethers'
import { resolve } from 'path'
import { FNS } from '..'
import { ContractName } from '../contracts/types'
import StaticFNS from '../static'
import contracts from './contract-imports'
import functions from './func-imports'

config({
  path: resolve(__dirname, '../../.env.local'),
  override: true,
})

export const deploymentAddresses: Record<string, string> = {
  Registry: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  LegacyPublicResolver: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
  NoMulticallResolver: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
}

const createFNS = (graphURI: string, useReal?: boolean) =>
    new FNS({
      graphURI,
    })

export default async (useReal?: boolean) => {
  const { graphURI, providerURI, chainId } = {
    graphURI: 'http://localhost:5678/hardhat',
    providerURI: 'http://localhost:8545',
    chainId: 31337,
  }
  const provider = new ethers.providers.StaticJsonRpcProvider(
      providerURI,
      chainId,
  )

  let fnsInstance = createFNS(graphURI, useReal)
  await fnsInstance.setProvider(provider)

  if (useReal) {
    return { fnsInstance, revert: () => {}, createSnapshot: () => {}, provider }
  }

  let snapshot = await provider.send('evm_snapshot', [])

  const revert = async (customSnapshot?: any) => {
    const snapshotToUse = customSnapshot || snapshot
    await provider.send('evm_revert', [snapshotToUse])
    if (parseInt(snapshot, 16) >= parseInt(snapshotToUse, 16)) {
      snapshot = await provider.send('evm_snapshot', [])
    }

    fnsInstance = createFNS(graphURI)
    await fnsInstance.setProvider(provider)
    return
  }

  const createSnapshot = async () => provider.send('evm_snapshot', [])

  return { fnsInstance, revert, createSnapshot, provider }
}
