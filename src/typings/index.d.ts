import { PluginFunc, Dayjs } from 'dayjs'

declare const plugin: PluginFunc
export as namespace plugin
export = plugin

declare namespace plugin {
  export type Sets<R extends any = string> = R[][]
  export type CalendarSetsInput<R extends any = string> = {
    month?: number
    year?: number
    format?: (value: string) => R
  }
  interface CalendarSets<R extends any = string> {
    instance?: Dayjs
    $month: number
    $year: number
    reset(): this
    current<T extends boolean = true>(params?: { chunked?: T }): T extends false ? string[] : Sets
    next<T extends boolean = true>(params?: {
      chunked?: T
      type?: 'year' | 'month'
    }): T extends false ? R[] : Sets<R>
    prev<T extends boolean = true>(params?: {
      chunked?: T
      type?: 'year' | 'month'
    }): T extends false ? R[] : Sets<R>
    month<T extends boolean = true>(params?: {
      month?: number
      chunked?: T
      year?: number
    }): T extends false ? R[] : Sets<R>
    year<T extends boolean = true>(params?: {
      year?: number
      chunked?: T
    }): T extends false ? Record<string, R[]> : Record<string, Sets<R>>
  }
}

declare module 'dayjs' {
  export const calendarSets: <R extends any = string>(
    input?: plugin.CalendarSetsInput<R>,
  ) => plugin.CalendarSets<R>
}
