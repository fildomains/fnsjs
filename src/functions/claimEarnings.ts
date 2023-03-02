import { FNSArgs } from '..'

export default async function ({
  contracts,
  signer,
}: FNSArgs<'contracts' | 'signer'>) {
  const sunday = (await contracts?.getSunday())?.connect(signer)!

  return sunday.populateTransaction.claimEarnings()
}
