import { Dayjs, PluginFunc } from 'dayjs'
import chunk from 'lodash.chunk'

import { CalendarSetProps } from './typings'

const DEFAULT_CHUNK = 7

/**
 * @description generate calender sets
 * @example dayjs().calendarSet({ month, chunked })
 * @returns [['', 1, ..., 7], ..., ['', 1, ..., 7]]
 */
export const calendarSet: PluginFunc<undefined> = (_options, dayjs) => {
  ;(dayjs.prototype as any).calendarSet = function(
    this: Dayjs,
    { chunked = true, ...args }: CalendarSetProps,
  ) {
    /** total days of <month> */
    const len = this.set('date', 1)
      .set('month', args.month)
      .daysInMonth()
    /** array of each-day in <month> */
    const days = new Array(len).fill(0).map((_v, i) =>
      this.set('date', i + 1)
        .set('month', args.month)
        .format('YYYY-MM-DD'),
    )
    /** get the-first-day-of-month the-day-of-week */
    const firstDayOfMonth =
      (this.month(args.month)
        .startOf('month')
        .day() || DEFAULT_CHUNK) - 1
    const lastDayOfMonth =
      this.month(args.month)
        .endOf('month')
        .day() || DEFAULT_CHUNK
    /**
     * 如果一个月的第一天是星期2，那么前面就有一个星期一的空
     */
    const beginEmpties = new Array(firstDayOfMonth).fill('')
    const endEmpties = new Array(7 - lastDayOfMonth).fill('')
    const calendarSets = beginEmpties.concat(days).concat(endEmpties)
    return chunked ? chunk(calendarSets, DEFAULT_CHUNK) : calendarSets
  }
}
