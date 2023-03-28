import { Oracle as NewOracle } from '@ensdomains/dnssecoraclejs'
import packet from 'dns-packet'
import type { FNSArgs } from '..'
import { EMPTY_ADDRESS } from '../utils/consts'

export const DNS_OVER_HTTP_ENDPOINT = 'https://1.1.1.1/dns-query'

export type ImportDNSSECNameProps = {
  address: string
  proverResult: any
}

export default async function (
  { contracts, provider }: FNSArgs<'contracts' | 'signer' | 'provider'>,
  name: string,
  { address, proverResult }: ImportDNSSECNameProps,
) {
  const dnsRegistrarContract = await contracts?.getDNSRegistrar()
  const resolverContract = await contracts?.getPublicResolver()
  const registrarOracle = await dnsRegistrarContract?.oracle()

  if (!registrarOracle) {
    throw new Error('No oracle found')
  }

  const oracle = new NewOracle(registrarOracle, provider!)
  const proofData = await oracle.getProofData(proverResult)
  const encodedName = `0x${packet.name.encode(name).toString('hex')}`
  const { rrsets } = proofData

  if (address === EMPTY_ADDRESS) {
    return dnsRegistrarContract?.populateTransaction.proveAndClaim(
      encodedName,
      rrsets,
    )
  }

  if (address) {
    return dnsRegistrarContract?.populateTransaction.proveAndClaimWithResolver(
      encodedName,
      rrsets,
      resolverContract!.address,
      address,
    )
  }
}
