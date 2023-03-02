import type { JsonRpcProvider } from '@ethersproject/providers'
import { Sunday__factory } from '../generated/factories/Sunday__factory'

export default (provider: JsonRpcProvider, address: string) =>
  Sunday__factory.connect(address, provider)
