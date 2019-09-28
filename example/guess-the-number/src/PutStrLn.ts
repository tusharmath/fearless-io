import {FIO} from '../../../packages/core/lib/main/FIO'

import {IConsole} from './Env'

/**
 * Uses console.log to printout items on the CLI
 */
export const putStrLn = (...t: unknown[]) =>
  FIO.access((env: IConsole) => env.console.log(...t))
