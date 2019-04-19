/**
 * Created by tushar on 2019-03-11
 */

import {assert} from 'chai'
import {scheduler as sh} from 'ts-scheduler'

import {IO} from '../'
import {defaultEnv} from '../src/envs/SchedulerEnv'

import {RejectingIOSpec} from './internals/IOSpecification'

describe('reject', () => {
  it('creates a rejected io', async () => {
    const error = new Error('Bananas')
    const actual = await IO.reject(error)
      .toPromise(defaultEnv)
      .catch((err: Error) => 'ERR:' + err.message)
    const expected = 'ERR:' + error.message
    assert.strictEqual(actual, expected)
  })

  it('should abort rejected io', cb => {
    const error = new Error('Bananas')
    IO.reject(error).fork({scheduler: sh}, cb, cb)()
    cb()
  })

  RejectingIOSpec(() => IO.reject(new Error('FAILED')))
})
