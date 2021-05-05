import { PluginFunc, Dayjs } from 'dayjs'

declare const plugin: PluginFunc
export as namespace plugin
export = plugin

declare namespace plugin {
  export type Sets = string[][]
  export type CalendarSetsInput = { month?: number; year?: number }
  interface CalendarSets {
    instance?: Dayjs
    $month: number
    $year: number
    reset(): void
    next(params?: { chunked?: boolean; type?: 'year' | 'month' }): Sets
    month<T extends boolean = true>(params?: {
      month?: number
      chunked?: T
      year?: number
    }): T extends false ? string[] : Sets[]
    year<T extends boolean = true>(params?: {
      year?: number
      chunked?: T
    }): T extends false ? Record<string, string[]> : Record<string, Sets>
  }
}

declare module 'dayjs' {
  /**
   * @param time If unit is not present, time treated as number of milliseconds
   */
  export const calendarSets: () => plugin.CalendarSets
}
