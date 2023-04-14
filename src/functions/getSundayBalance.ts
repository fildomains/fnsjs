import { FNSArgs } from '..'

const raw = async (
  { contracts }: FNSArgs<'contracts'>,
  address: string,
) => {
  const sunday = await contracts?.getSunday()!
  return {
    to: sunday.address,
    data: sunday.interface.encodeFunctionData('balanceOf', [address]),
  }
}

const decode = async ({ contracts }: FNSArgs<'contracts'>, data: string) => {
  if (data === null) return
  const sunday = await contracts?.getSunday()!
  try {
    const result = sunday.interface.decodeFunctionResult('balanceOf', data)
    return result[0]
  } catch {
    return undefined
  }
}

export default {
  raw,
  decode,
}
