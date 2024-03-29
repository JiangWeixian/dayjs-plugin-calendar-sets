import dayjs, { Dayjs, PluginFunc } from 'dayjs'
import chunk from 'lodash.chunk'

import plugin from './typings/index'

const defaultChunk = 7
const format = (value: string) => {
  return dayjs(value).format('YYYY-MM-DD')
}

class CalendarSets implements plugin.CalendarSets {
  instance?: Dayjs
  $month = 0
  $year = 0
  $format = format
  constructor(instance: Dayjs, params: plugin.CalendarSetsInput) {
    this.instance = instance
    this.$month = params.month ?? this.instance!.month()
    this.$year = params.year ?? this.instance!.year()
    this.$format = params.format ?? format
  }

  reset() {
    this.$month = this.instance!.month()
    this.$year = this.instance!.year()
    return this
  }

  current({ chunked = true }: Parameters<plugin.CalendarSets['current']>[0] = { chunked: true }) {
    return this.month({ chunked, month: this.$month, year: this.$year })
  }

  prev(
    { chunked = true, type = 'month' }: Parameters<plugin.CalendarSets['prev']>[0] = {
      chunked: true,
      type: 'month',
    },
  ) {
    if (type === 'year') {
      this.$year -= 1
    } else {
      this.$month -= 1
      if (this.$month < 0) {
        this.$year -= 1
        this.$month = 11
      }
    }
    return this.month({ chunked, month: this.$month, year: this.$year })
  }

  next(
    { chunked = true, type = 'month' }: Parameters<plugin.CalendarSets['next']>[0] = {
      chunked: true,
      type: 'month',
    },
  ) {
    if (type === 'year') {
      this.$year += 1
    } else {
      this.$month += 1
      if (this.$month > 11) {
        this.$year += 1
        this.$month = 0
      }
    }

    return this.month({ chunked, month: this.$month, year: this.$year })
  }

  year({ year, chunked }: Parameters<plugin.CalendarSets['year']>[0] = {}) {
    const data: any = {}
    new Array(12).fill(0).forEach((_, month) => {
      data[month] = this.month({ month, chunked, year })
    })
    return data
  }

  /**
   * @description generate calender sets
   * @example dayjs().calendarSet({ month, chunked })
   * @returns [['', 1, ..., 7], ..., ['', 1, ..., 7]]
   */
  month(
    { chunked = true, ...args }: Parameters<plugin.CalendarSets['month']>[0] = {
      chunked: true,
    },
  ): any {
    const month = args.month ?? this.instance!.month()
    /** total days of <month> */
    const len = this.instance!.set('month', month).set('date', 1).daysInMonth()
    /** array of each-day in <month> */
    const days = new Array(len).fill(0).map((_v, i) => {
      const date = this.instance!.year(args.year ?? this.instance!.year())
        .set('month', month)
        .set('date', i + 1)
        .format('YYYY-MM-DD')
      return this.$format(date)
    })
    /** get the-first-day-of-month the-day-of-week */
    const firstDayOfMonth = (this.instance!.month(month).startOf('month').day() || defaultChunk) - 1
    const lastDayOfMonth = this.instance!.month(month).endOf('month').day() || defaultChunk
    /**
     * 如果一个月的第一天是星期2，那么前面就有一个星期一的空
     */
    const beginEmpties = new Array(firstDayOfMonth).fill('')
    const endEmpties = new Array(7 - lastDayOfMonth).fill('')
    const calendarSets = beginEmpties.concat(days).concat(endEmpties)
    return chunked ? chunk(calendarSets, defaultChunk) : calendarSets.filter((v) => !!v)
  }
}

const wrapper: PluginFunc = (_options, _Dayjs, dayjs) => {
  ;(dayjs as any).calendarSets = (input: plugin.CalendarSetsInput = { format }) => {
    return new CalendarSets(dayjs(), input)
  }
}

export default wrapper
