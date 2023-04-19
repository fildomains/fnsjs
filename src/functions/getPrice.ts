import { BigNumber } from '@ethersproject/bignumber'
import { FNSArgs } from '..'

const raw = async (
  { contracts }: FNSArgs<'contracts'>,
  nameOrNames: string | string[],
  duration: number,
) => {
  const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames]

  if (names.length > 1) {
    const bulkRenewal = await contracts?.getBulkRenewal()!
    const baseCall = {
      to: bulkRenewal.address,
      data: bulkRenewal.interface.encodeFunctionData('rentPrice', [
        names,
        duration,
      ]),
    }

    return baseCall
  }

  const controller = await contracts?.getRegistrarController()!
  const baseCall = {
    to: controller.address,
    data: controller.interface.encodeFunctionData('rentPrice', [
      names[0],
      duration,
    ]),
  }

  return baseCall
}

const decode = async (
  { contracts }: FNSArgs<'contracts'>,
  data: string,
  _nameOrNames: string | string[],
) => {
  if (data === null) return
  try {
    let base: BigNumber
    let premium: BigNumber
    let baseFns: BigNumber = BigNumber.from(0)
    let premiumFns: BigNumber = BigNumber.from(0)

    const isBulkRenewal = Array.isArray(_nameOrNames) && _nameOrNames.length > 1
    if (isBulkRenewal) {
      const bulkRenewal = await contracts?.getBulkRenewal()!
      const result = bulkRenewal.interface.decodeFunctionResult(
        'rentPrice',
        data,
      )
      ;[base, baseFns] = result
      baseFns = baseFns || BigNumber.from(0)
      premium = BigNumber.from(0)
    } else {
      const controller = await contracts?.getRegistrarController()!
      const result = controller.interface.decodeFunctionResult(
        'rentPrice',
        data,
      )
      ;[base, premium, baseFns, premiumFns] = result[0] as [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ]
    }
    return {
      base,
      premium,
      baseFns,
      premiumFns,
    }
  } catch {
    return
  }
}

export default { raw, decode }
