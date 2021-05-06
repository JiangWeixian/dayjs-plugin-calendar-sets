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
    reset(): this
    current<T extends boolean = true>(params?: { chunked?: T }): T extends false ? string[] : Sets
    next<T extends boolean = true>(params?: {
      chunked?: T
      type?: 'year' | 'month'
    }): T extends false ? string[] : Sets
    prev<T extends boolean = true>(params?: {
      chunked?: T
      type?: 'year' | 'month'
    }): T extends false ? string[] : Sets
    month<T extends boolean = true>(params?: {
      month?: number
      chunked?: T
      year?: number
    }): T extends false ? string[] : Sets
    year<T extends boolean = true>(params?: {
      year?: number
      chunked?: T
    }): T extends false ? Record<string, string[]> : Record<string, Sets>
  }
}

declare module 'dayjs' {
  export const calendarSets: (input?: plugin.CalendarSetsInput) => plugin.CalendarSets
}
