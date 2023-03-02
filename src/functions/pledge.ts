import { FNSArgs } from '..'

export default async function (
  { contracts, signer }: FNSArgs<'contracts' | 'signer'>,
  amount: string | number,
) {
  const fnsToken = (await contracts?.getFNSToken())?.connect(signer)!

  return fnsToken.populateTransaction.pledge(amount)
}
