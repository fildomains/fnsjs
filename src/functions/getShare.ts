import { FNSArgs } from '..'

const raw = async (
  { contracts }: FNSArgs<'contracts'>,
  week: string | number,
) => {
  const sunday = await contracts?.getSunday()!
  return {
    to: sunday.address,
    data: sunday.interface.encodeFunctionData('getShare', [week]),
  }
}

const decode = async ({ contracts }: FNSArgs<'contracts'>, data: string) => {
  if (data === null) return
  const sunday = await contracts?.getSunday()!
  try {
    const result = sunday.interface.decodeFunctionResult('getShare', data)
    return {
      fil: result[0]['0'],
      fns: result[0]['1'],
      inited: result[0]['2'],
    }
  } catch {
    return undefined
  }
}

export default {
  raw,
  decode,
}
