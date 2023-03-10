import { FNS } from '..'
import setup from '../tests/setup'
import { decodeFuses } from '../utils/fuses'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

const testProperties = (obj: object, ...properties: string[]) =>
  properties.map((property) => expect(obj).toHaveProperty(property))

describe('getSubnames', () => {
  it('should get the subnames for a name ordered by createdAt in desc order', async () => {
    const result = await fnsInstance.getSubnames({
      name: 'wrapped-with-subnames.fil',
      pageSize: 10,
      orderBy: 'createdAt',
      orderDirection: 'desc',
    })
    expect(result).toBeTruthy()
    expect(result.subnames.length).toBe(4)
    expect(result.subnameCount).toBe(4)
    expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
    expect(result.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')
    expect(result.subnames[2].name).toEqual('legacy.wrapped-with-subnames.fil')
    expect(result.subnames[3].name).toEqual('test.wrapped-with-subnames.fil')
    expect(
      result.subnames.every((subname, i, arr) => {
        if (arr[i + 1]) {
          return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
        }
        return true
      }),
    ).toBe(true)
    testProperties(
      result.subnames[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'owner',
      'truncatedName',
    )
  })

  it('should get the subnames for a name ordered by createdAt in asc order', async () => {
    const result = await fnsInstance.getSubnames({
      name: 'wrapped-with-subnames.fil',
      pageSize: 10,
      orderBy: 'createdAt',
      orderDirection: 'asc',
    })
    expect(result).toBeTruthy()
    expect(result.subnames.length).toBe(4)
    expect(result.subnameCount).toBe(4)
    expect(result.subnames[0].name).toEqual('test.wrapped-with-subnames.fil')
    expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
    expect(result.subnames[2].name).toEqual('xyz.wrapped-with-subnames.fil')
    expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
    expect(
      result.subnames.every((subname, i, arr) => {
        if (arr[i + 1]) {
          return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
        }
        return true
      }),
    ).toBe(true)
    testProperties(
      result.subnames[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'owner',
      'truncatedName',
    )
  })

  it('should get the subnames for a name by labelName in desc order', async () => {
    const result = await fnsInstance.getSubnames({
      name: 'wrapped-with-subnames.fil',
      pageSize: 10,
      orderBy: 'labelName',
      orderDirection: 'desc',
    })
    expect(result).toBeTruthy()
    expect(result.subnames.length).toBe(4)
    expect(result.subnameCount).toBe(4)
    expect(result.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
    expect(result.subnames[1].name).toEqual('test.wrapped-with-subnames.fil')
    expect(result.subnames[2].name).toEqual('legacy.wrapped-with-subnames.fil')
    expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
    testProperties(
      result.subnames[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'owner',
      'truncatedName',
    )
  })

  it('should get the subnames for a name by labelName in asc order', async () => {
    const result = await fnsInstance.getSubnames({
      name: 'wrapped-with-subnames.fil',
      pageSize: 10,
      orderBy: 'labelName',
      orderDirection: 'asc',
    })
    expect(result).toBeTruthy()
    expect(result.subnames.length).toBe(4)
    expect(result.subnameCount).toBe(4)
    expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
    expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
    expect(result.subnames[2].name).toEqual('test.wrapped-with-subnames.fil')
    expect(result.subnames[3].name).toEqual('xyz.wrapped-with-subnames.fil')
    testProperties(
      result.subnames[0],
      'id',
      'labelName',
      'labelhash',
      'name',
      'isMigrated',
      'owner',
      'truncatedName',
    )
  })
  describe('wrapped subnames', () => {
    it('should return fuses', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })

      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].fuses).toBeDefined()
    })
    it('should return expiry as undefined if 0', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-expiring-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })

      expect(result).toBeTruthy()
      expect(result.subnames[1].expiryDate).toBeUndefined()
    })
    it('should return expiry', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-expiring-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })

      expect(result).toBeTruthy()
      expect(result.subnames[2].expiryDate).toBeInstanceOf(Date)
    })
    it('should return owner as undefined, fuses as 0, and pccExpired as true if pcc expired', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-expiring-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })

      expect(result).toBeTruthy()
      expect(result.subnames[0].owner).toBeTruthy()
      expect(result.subnames[0].fuses).toStrictEqual(decodeFuses(0))
      expect(result.subnames[0].pccExpired).toBe(false)
    })
  })

  describe('with pagination', () => {
    it('should get paginated subnames for a name ordered by createdAt in desc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual('legacy.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('test.wrapped-with-subnames.fil')
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
          }
          return true
        }),
      ).toBe(true)
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name ordered by createdAt in asc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'asc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
          }
          return true
        }),
      ).toBe(true)
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name by labelName in desc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'labelName',
        orderDirection: 'desc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual('legacy.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name by labelName in asc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'labelName',
        orderDirection: 'asc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('xyz.wrapped-with-subnames.fil')
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    describe('with pagination', () => {
      it('should get paginated subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'desc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(result2.subnames[1].name).toEqual('test.wrapped-with-subnames.fil')
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('test.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
        })

        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
        expect(result2.subnames[1].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'desc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('test.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(result2.subnames[1].name).toEqual('addr.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'asc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')

        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )

        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('test.wrapped-with-subnames.fil')
        expect(result2.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })

    describe('With search query', () => {
      it('should get the searched subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the searched subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 10,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'labelName',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('addr.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'labelName',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual('legacy.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })

    describe('with search query and pagination', () => {
      it('should get paginated subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
          search: 'a',
        })

        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')

        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )

        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual('legacy.wrapped-with-subnames.fil')

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })
  })

  describe('wrapped', () => {
    it('should get the subnames for a name ordered by createdAt in desc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual(
        'legacy.wrapped-with-subnames.fil',
      )
      expect(result.subnames[3].name).toEqual('test.wrapped-with-subnames.fil')
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
          }
          return true
        }),
      ).toBe(true)
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name ordered by createdAt in asc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'createdAt',
        orderDirection: 'asc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual(
        'legacy.wrapped-with-subnames.fil',
      )
      expect(result.subnames[2].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
          }
          return true
        }),
      ).toBe(true)
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name by labelName in desc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'labelName',
        orderDirection: 'desc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[2].name).toEqual(
        'legacy.wrapped-with-subnames.fil',
      )
      expect(result.subnames[3].name).toEqual('addr.wrapped-with-subnames.fil')
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    it('should get the subnames for a name by labelName in asc order', async () => {
      const result = await fnsInstance.getSubnames({
        name: 'wrapped-with-subnames.fil',
        pageSize: 10,
        orderBy: 'labelName',
        orderDirection: 'asc',
      })
      expect(result).toBeTruthy()
      expect(result.subnames.length).toBe(4)
      expect(result.subnameCount).toBe(4)
      expect(result.subnames[0].name).toEqual('addr.wrapped-with-subnames.fil')
      expect(result.subnames[1].name).toEqual(
        'legacy.wrapped-with-subnames.fil',
      )
      expect(result.subnames[2].name).toEqual('test.wrapped-with-subnames.fil')
      expect(result.subnames[3].name).toEqual('xyz.wrapped-with-subnames.fil')
      testProperties(
        result.subnames[0],
        'id',
        'labelName',
        'labelhash',
        'name',
        'isMigrated',
        'owner',
        'truncatedName',
      )
    })

    describe('with pagination', () => {
      it('should get paginated subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'desc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual('xyz.wrapped-with-subnames.fil')
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(result2.subnames[1].name).toEqual(
          'test.wrapped-with-subnames.fil',
        )
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'test.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
        })

        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'xyz.wrapped-with-subnames.fil',
        )
        expect(result2.subnames[1].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'desc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual('xyz.wrapped-with-subnames.fil')
        expect(result.subnames[1].name).toEqual(
          'test.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(result2.subnames[1].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'asc',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )

        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )

        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 2,
          orderBy: 'labelName',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(2)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'test.wrapped-with-subnames.fil',
        )
        expect(result2.subnames[1].name).toEqual(
          'xyz.wrapped-with-subnames.fil',
        )

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })

    describe('With search query', () => {
      it('should get the searched subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt >= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the searched subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 10,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'labelName',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get the subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 10,
          orderBy: 'labelName',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(2)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        expect(result.subnames[1].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })

    describe('with search query and pagination', () => {
      it('should get paginated subnames for a name ordered by createdAt in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name ordered by createdAt in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (subname as any).createdAt <= (arr[i + 1] as any).createdAt
            }
            return true
          }),
        ).toBe(true)
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          page: 0,
          pageSize: 2,
          orderBy: 'createdAt',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
          search: 'a',
        })

        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in desc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'desc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'desc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )
        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })

      it('should get paginated subnames for a name by labelName in asc order', async () => {
        const result = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'asc',
          search: 'a',
        })
        expect(result).toBeTruthy()
        expect(result.subnames.length).toBe(1)
        expect(result.subnameCount).toBe(4)
        expect(result.subnames[0].name).toEqual(
          'addr.wrapped-with-subnames.fil',
        )

        testProperties(
          result.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )

        const result2 = await fnsInstance.getSubnames({
          name: 'wrapped-with-subnames.fil',
          pageSize: 1,
          orderBy: 'labelName',
          orderDirection: 'asc',
          lastSubnames: result.subnames,
          search: 'a',
        })
        expect(result2).toBeTruthy()
        expect(result2.subnames.length).toBe(1)
        expect(result2.subnameCount).toBe(4)
        expect(result2.subnames[0].name).toEqual(
          'legacy.wrapped-with-subnames.fil',
        )

        testProperties(
          result2.subnames[0],
          'id',
          'labelName',
          'labelhash',
          'name',
          'isMigrated',
          'owner',
          'truncatedName',
        )
      })
    })
  })
})
