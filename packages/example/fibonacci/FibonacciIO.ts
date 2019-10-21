/* tslint:disable: no-use-before-declare no-console no-unbound-method strict-comparisons */

import {defaultRuntime, FMap, UIO} from '@fio/core'
import {FIO} from '@fio/core/index'

const fib = (N: bigint) =>
  FMap.of<bigint, bigint>().chain(cache => {
    const itar = cache.memoize(
      (n: bigint): UIO<bigint> => {
        if (n <= 2n) {
          return FIO.of(n)
        }

        return itar(n - 1n).zipWith(itar(n - 2n), (a, b) => a + b)
      }
    )

    return itar(N)
  })

defaultRuntime().unsafeExecute(fib(10n), console.log)
