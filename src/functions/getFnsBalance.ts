import { FNSArgs } from '..'

const raw = async ({ contracts }: FNSArgs<'contracts'>, address: string) => {
  const contract = await contracts?.getFNSToken()!
  return {
    to: contract.address,
    data: contract.interface.encodeFunctionData('balanceOf', [address]),
  }
}

const decode = async ({ contracts }: FNSArgs<'contracts'>, data: string) => {
  if (data === null) return
  const contract = await contracts?.getFNSToken()!
  try {
    const result = contract.interface.decodeFunctionResult('balanceOf', data)
    return result[0]
  } catch {
    return undefined
  }
}

export default {
  raw,
  decode,
}
