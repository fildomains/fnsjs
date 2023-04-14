import { ethers } from 'ethers'
import { FNS } from '..'
import setup from '../tests/setup'
import { Name } from './getNames'
import { encodeFuses } from '../utils/fuses'

const wrappedNames: {
  label: string
  namedOwner: string
  data?: any[]
  reverseRecord?: boolean
  fuses?: number
  subnames?: {
    label: string
    namedOwner: string
    fuses?: number
    expiry?: number
  }[]
  duration?: number
}[] = [
  {
    label: 'wrapped',
    namedOwner: 'owner',
    reverseRecord: false,
  },
  {
    label: 'wrapped-with-subnames',
    namedOwner: 'owner',
    subnames: [
      { label: 'test', namedOwner: 'owner2' },
      { label: 'legacy', namedOwner: 'owner2' },
      { label: 'xyz', namedOwner: 'owner2' },
      { label: 'addr', namedOwner: 'owner2' },
    ],
  },
  {
    label: 'expired-wrapped',
    namedOwner: 'owner',
    subnames: [{ label: 'test', namedOwner: 'owner2' }],
    duration: 2419200,
  },
  {
    label: 'wrapped-big-duration',
    namedOwner: 'owner3',
    duration: Math.floor((8640000000000000 - Date.now()) / 1000),
  },
  {
    label: 'wrapped-max-duration',
    namedOwner: 'owner3',
    duration: 18446744073709,
  },
  {
    label: 'wrapped-with-expiring-subnames',
    namedOwner: 'owner',
    fuses: encodeFuses({
      child: {
        named: ['CANNOT_UNWRAP'],
      },
    }),
    subnames: [
      {
        label: 'test',
        namedOwner: 'owner2',
        expiry: Math.floor(Date.now() / 1000),
      },
      {
        label: 'test1',
        namedOwner: 'owner2',
        expiry: 0,
      },
      {
        label: 'recent-pcc',
        namedOwner: 'owner2',
        expiry: Math.floor(Date.now() / 1000),
        fuses: 0,
      },
    ],
  },
]

let fnsInstance: FNS
let provider: ethers.providers.JsonRpcProvider
let accounts: string[]

beforeAll(async () => {
  ;({ fnsInstance, provider } = await setup())
  accounts = await provider.listAccounts()
})

const testProperties = (obj: object, ...properties: string[]) =>
  properties.map((property) => expect(obj).toHaveProperty(property))

const testNotProperties = (obj: object, ...properties: string[]) =>
  properties.map((property) => expect(obj).not.toHaveProperty(property))

const letterItems = [
  'w',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  ...Array(5).fill('3'),
  ...Array(11).fill('2'),
  ...Array(11).fill('1'),
  '0',
]

const domainLetterItems = [
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  '[',
  'w',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  ...Array(5).fill('3'),
  ...Array(11).fill('2'),
  ...Array(11).fill('1'),
  '0',
]

describe('getNames', () => {
  let totalRegistrations: number = 0
  let totalOwnedNames: number = 0
  it('should get the registrations for an address', async () => {
    const result = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'registrant',
    })
    totalRegistrations = result.length
    expect(result).toBeTruthy()
    testProperties(
      result[0],
      'expiryDate',
      'registrationDate',
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'parent',
      'truncatedName',
    )
  })
  it('should get the owned names for an address', async () => {
    const result = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
    })
    totalOwnedNames = result.length
    expect(result).toBeTruthy()
    testProperties(
      result[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'parent',
      'truncatedName',
    )
    testNotProperties(result[0], 'expiryDate', 'registrationDate')
  })
  it('should get wrapped domains for an address', async () => {
    const result = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'wrappedOwner',
    })
    expect(result).toBeTruthy()
    testProperties(
      result[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'parent',
      'truncatedName',
      'expiryDate',
      'fuses',
    )
  })
  it('should get the registrations for an address with pagination', async () => {
    const pageOne = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'registrant',
      page: 0,
    })
    expect(pageOne).toHaveLength(10)
    const pageTwo = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'registrant',
      page: 1,
    })
    expect(pageTwo).toHaveLength(10)
    const pageThree = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'registrant',
      page: 2,
    })
    expect(pageThree).toHaveLength(10)
    const pageFour = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'registrant',
      page: 3,
    })
    expect(pageFour).toHaveLength(totalRegistrations % 10)
  })
  it('should get the owned names for an address with pagination', async () => {
    const pageOne = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
      page: 0,
    })
    expect(pageOne).toHaveLength(10)
    const pageTwo = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
      page: 1,
    })
    expect(pageTwo).toHaveLength(10)
    const pageThree = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
      page: 2,
    })
    expect(pageThree).toHaveLength(10)
    const pageFour = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
      page: 3,
    })
    expect(pageFour).toHaveLength(10)
    const pageFive = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'owner',
      page: 4,
    })
    expect(pageFive).toHaveLength(totalOwnedNames % 10)
  })
  it('should get wrapped domains for an address with pagination, and filter out pcc expired names', async () => {
    const pageOne = await fnsInstance.getNames({
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      type: 'wrappedOwner',
      page: 0,
    })

    const nameCout = wrappedNames.reduce<number>((count, name) => {
      if (name.namedOwner === 'owner2') count += 1
      ;(name.subnames || []).forEach((subname: any) => {
        if (subname.namedOwner === 'owner2') count += 1
      })
      return count
    }, 0)

    // length of page one should be all the names on 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
    // minus 1 for the PCC expired name.
    // the result here implies that the PCC expired name is not returned
    expect(pageOne).toHaveLength(nameCout)
  })

  describe('resolved addresses', () => {
    /* eslint-disable @typescript-eslint/naming-convention */
    const RESOLVED_ADDRESS_COUNT: { [key: string]: number } = {
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266': 1,
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': 23,
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC': 35,
    }
    /* eslint-enable @typescript-eslint/naming-convention */

    it('should get the names that resolve to an address by labelName', async () => {
      const ADDRESSES = [accounts[0], accounts[1], accounts[2]]
      for (const ADDRESS of ADDRESSES) {
        // eslint-disable-next-line no-await-in-loop
        const pageOne = await fnsInstance.getNames({
          address: ADDRESS,
          type: 'resolvedAddress',
          orderBy: 'labelName',
          orderDirection: 'asc',
        })
        expect(pageOne.length).toBe(RESOLVED_ADDRESS_COUNT[ADDRESS])
        let prevLabelName = pageOne[0].labelName
        for (const name of pageOne) {
          expect(
            !!name.labelName &&
              prevLabelName &&
              name.labelName >= prevLabelName,
          ).toBe(true)
          prevLabelName = name.labelName
          // eslint-disable-next-line no-await-in-loop
          const profile = await fnsInstance.getProfile(name.name)
          const eth = profile?.records?.coinTypes?.find(
            (coin) => coin.coin === 'ETH',
          )
          expect((eth as any).addr).toBe(ADDRESS)
        }
      }
    })

    it('should get the names that resolve to an address by creationDate', async () => {
      const ADDRESSES = [accounts[0], accounts[1], accounts[2]]
      for (const ADDRESS of ADDRESSES) {
        // eslint-disable-next-line no-await-in-loop
        const pageOne = await fnsInstance.getNames({
          address: ADDRESS,
          type: 'resolvedAddress',
          orderBy: 'createdAt',
          orderDirection: 'desc',
        })
        expect(pageOne.length).toBe(RESOLVED_ADDRESS_COUNT[ADDRESS])
        let prevCreatedAt = pageOne[0].createdAt?.getTime()
        for (const name of pageOne) {
          expect(
            !!name.createdAt &&
              !!prevCreatedAt &&
              name.createdAt.getTime() <= prevCreatedAt,
          ).toBe(true)
          prevCreatedAt = name.createdAt?.getTime()
          // eslint-disable-next-line no-await-in-loop
          const profile = await fnsInstance.getProfile(name.name)
          const eth = profile?.records?.coinTypes?.find(
            (coin) => coin.coin === 'ETH',
          )
          expect((eth as any).addr).toBe(ADDRESS)
        }
      }
    })
  })
  describe('orderBy', () => {
    describe('registrations', () => {
      it('descending registrationDate', async () => {
        const registrationDateOrderedDesc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'registrationDate',
          orderDirection: 'desc',
        })) as Name[]
        registrationDateOrderedDesc.reduce((prev, curr) => {
          expect(prev.registrationDate!.getTime()).toBeGreaterThanOrEqual(
            curr.registrationDate!.getTime(),
          )
          return curr
        })
      })
      it('ascending registrationDate', async () => {
        const registrationDateOrderedAsc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'registrationDate',
          orderDirection: 'asc',
        })) as Name[]
        registrationDateOrderedAsc.reduce((prev, curr) => {
          expect(prev.registrationDate!.getTime()).toBeLessThanOrEqual(
            curr.registrationDate!.getTime(),
          )
          return curr
        })
      })
      it('descending expiryDate', async () => {
        const expiryDateOrderedDesc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'expiryDate',
          orderDirection: 'desc',
        })) as Name[]
        expiryDateOrderedDesc.reduce((prev, curr) => {
          expect(prev.expiryDate!.getTime()).toBeGreaterThanOrEqual(
            curr.expiryDate!.getTime(),
          )
          return curr
        })
      })
      it('ascending expiryDate', async () => {
        const expiryDateOrderedAsc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'expiryDate',
          orderDirection: 'asc',
        })) as Name[]
        expiryDateOrderedAsc.reduce((prev, curr) => {
          expect(prev.expiryDate!.getTime()).toBeLessThanOrEqual(
            curr.expiryDate!.getTime(),
          )
          return curr
        })
      })
      it('descending labelName', async () => {
        const labelNameOrderedDesc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'labelName',
          orderDirection: 'desc',
        })) as Name[]
        expect(labelNameOrderedDesc.map((n) => n.labelName![0])).toStrictEqual(
          letterItems,
        )
      })
      it('ascending labelName', async () => {
        const labelNameOrderedAsc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'registrant',
          orderBy: 'labelName',
          orderDirection: 'asc',
        })) as Name[]
        expect(labelNameOrderedAsc.map((n) => n.labelName![0])).toStrictEqual(
          letterItems.reverse(),
        )
      })
    })
    describe('owned names', () => {
      it('descending createdAt', async () => {
        const createdAtOrderedDesc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'owner',
          orderBy: 'createdAt',
          orderDirection: 'desc',
        })) as Name[]
        createdAtOrderedDesc.reduce((prev, curr) => {
          expect(prev.createdAt!.getTime()).toBeGreaterThanOrEqual(
            curr.createdAt!.getTime(),
          )
          return curr
        })
      })
      it('ascending createdAt', async () => {
        const createdAtOrderedAsc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'owner',
          orderBy: 'createdAt',
          orderDirection: 'asc',
        })) as Name[]
        createdAtOrderedAsc.reduce((prev, curr) => {
          expect(prev.createdAt!.getTime()).toBeLessThanOrEqual(
            curr.createdAt!.getTime(),
          )
          return curr
        })
      })
      it('descending labelName', async () => {
        const labelNameOrderedDesc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'owner',
          orderBy: 'labelName',
          orderDirection: 'desc',
        })) as Name[]
        expect(labelNameOrderedDesc.map((n) => n.name[0])).toStrictEqual(
          domainLetterItems,
        )
      })
      it('ascending labelName', async () => {
        const labelNameOrderedAsc = (await fnsInstance.getNames({
          address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          type: 'owner',
          orderBy: 'labelName',
          orderDirection: 'asc',
        })) as Name[]
        expect(labelNameOrderedAsc.map((n) => n.name[0])).toStrictEqual(
          domainLetterItems.reverse(),
        )
      })
    })
  })
})
