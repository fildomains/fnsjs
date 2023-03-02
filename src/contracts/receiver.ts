import type { JsonRpcProvider } from '@ethersproject/providers'
import { Receiver__factory } from '../generated/factories/Receiver__factory'

export default (provider: JsonRpcProvider, address: string) =>
  Receiver__factory.connect(address, provider)
