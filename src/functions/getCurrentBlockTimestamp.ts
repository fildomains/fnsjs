import { FNSArgs } from '..'

const raw = async ({ contracts }: FNSArgs<'contracts'>) => {
  const contract = await contracts?.getMulticall()!
  return {
    to: contract.address,
    data: contract.interface.encodeFunctionData('getCurrentBlockTimestamp'),
  }
}

const decode = async ({ contracts }: FNSArgs<'contracts'>, data: string) => {
  if (data === null) return
  const contract = await contracts?.getMulticall()!
  try {
    const result = contract.interface.decodeFunctionResult(
      'getCurrentBlockTimestamp',
      data,
    )
    return result[0]
  } catch {
    return undefined
  }
}

export default {
  raw,
  decode,
}
