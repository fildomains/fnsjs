import { FNSArgs } from '..'

export default async function (
  { contracts, signer }: FNSArgs<'contracts' | 'signer'>,
  amount: string | number,
) {
  const contract = (await contracts?.getSunday())?.connect(signer)!

  return contract.populateTransaction.withdrawal(amount)
}
