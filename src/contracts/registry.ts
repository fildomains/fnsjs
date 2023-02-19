import type { JsonRpcProvider } from '@ethersproject/providers'
import { Registry__factory } from '../generated/factories/Registry__factory'

export default (provider: JsonRpcProvider, address: string) =>
  Registry__factory.connect(address, provider)
