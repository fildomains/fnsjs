import { toUtf8String } from 'ethers/lib/utils'
import { FNS } from '..'
import setup from '../tests/setup'
import { hexEncodeName } from '../utils/hexEncodedName'
import { namehash } from '../utils/normalise'

const dummyABI = [
  {
    type: 'function',
    name: 'supportsInterface',
    constant: true,
    stateMutability: 'view',
    payable: false,
    inputs: [
      {
        type: 'bytes4',
      },
    ],
    outputs: [
      {
        type: 'bool',
      },
    ],
  },
]

let fnsInstance: FNS
let revert: Awaited<ReturnType<typeof setup>>['revert']

beforeAll(async () => {
  ;({ fnsInstance, revert } = await setup())
})

afterAll(async () => {
  await revert()
})

describe('setRecords', () => {
  it('should return a transaction to the resolver and set successfully', async () => {
    const tx = await fnsInstance.setRecords('test123.fil', {
      records: {
        coinTypes: [
          {
            key: 'ETC_LEGACY',
            value: '0x42D63ae25990889E35F215bC95884039Ba354115',
          },
        ],
        texts: [{ key: 'foo', value: 'bar' }],
        abi: {
          data: dummyABI,
        },
      },
      addressOrIndex: 1,
    })
    expect(tx).toBeTruthy()
    await tx.wait()

    const universalResolver =
      await fnsInstance.contracts!.getUniversalResolver()!
    const publicResolver = await fnsInstance.contracts!.getPublicResolver()!
    const encodedText = await universalResolver['resolve(bytes,bytes)'](
      hexEncodeName('test123.fil'),
      publicResolver.interface.encodeFunctionData('text', [
        namehash('test123.fil'),
        'foo',
      ]),
    )
    const encodedAddr = await universalResolver['resolve(bytes,bytes)'](
      hexEncodeName('test123.fil'),
      publicResolver.interface.encodeFunctionData('addr(bytes32,uint256)', [
        namehash('test123.fil'),
        '61',
      ]),
    )
    const [resultText] = publicResolver.interface.decodeFunctionResult(
      'text',
      encodedText[0],
    )
    const [resultAddr] = publicResolver.interface.decodeFunctionResult(
      'addr(bytes32,uint256)',
      encodedAddr[0],
    )
    expect(resultText).toBe('bar')
    expect(resultAddr).toBe(
      '0x42D63ae25990889E35F215bC95884039Ba354115'.toLowerCase(),
    )

    const encodedABI = await universalResolver['resolve(bytes,bytes)'](
      hexEncodeName('test123.fil'),
      publicResolver.interface.encodeFunctionData('ABI', [
        namehash('test123.fil'),
        '0x01',
      ]),
    )
    const [contentType, resultABI] =
      publicResolver.interface.decodeFunctionResult('ABI', encodedABI[0])
    expect(contentType.toNumber()).toBe(1)
    expect(toUtf8String(resultABI)).toBe(JSON.stringify(dummyABI))
  })
})
