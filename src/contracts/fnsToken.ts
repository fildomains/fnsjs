import type { JsonRpcProvider } from '@ethersproject/providers'
import { FNSToken__factory } from '../generated/factories/FNSToken__factory'

export default (provider: JsonRpcProvider, address: string) =>
  FNSToken__factory.connect(address, provider)
