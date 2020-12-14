import { Dayjs, PluginFunc } from 'dayjs'
import chunk from 'lodash.chunk'

import { CalendarSetProps } from './typings'

/**
 * @description generate calender sets
 * @example dayjs().calendarSet({ month, chunked })
 * @returns [['', 1, ..., 7], ..., ['', 1, ..., 7]]
 */
export const calendarSet: PluginFunc<undefined> = (_options, dayjs) => {
  ;(dayjs.prototype as any).calendarSet = function(this: Dayjs, args: CalendarSetProps) {
    /** total days of <month> */
    const len = this.set('date', 1)
      .set('month', args.month)
      .daysInMonth()
    /** array of each-day in <month> */
    const days = new Array(len).fill(0).map((_v, i) => this.date(i + 1).format('YYYY-MM-DD'))
    /** get the-first-day-of-month the-day-of-week */
    const firstDayOfMonth =
      this.month(args.month)
        .startOf('month')
        .day() - 1
    /**
     * 如果一个月的第一天是星期2，那么前面就有一个星期一的空
     */
    const empties = new Array(firstDayOfMonth).fill('')
    const calendarSets = empties.concat(days)
    return args.chunked ? chunk(calendarSets) : calendarSets
  }
}
