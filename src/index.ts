import { Dayjs, PluginFunc } from 'dayjs'

type CalendarSetProps = {
  month: number
}

export const calendarSet: PluginFunc<undefined> = (_options, dayjs) => {
  (dayjs.prototype as any).calendarSet = function (this: Dayjs, args: CalendarSetProps) {
    const len = this.set('date', 1).set('month', args.month).daysInMonth()
    const days = new Array(len).fill(0).map((_v, i) => this.date(i+1).format('YYYY-MM-DD'))
    const first = this.month(args.month).startOf('month').day() - 1
    const empties = new Array(first).fill('')
    return empties.concat(days)
  }
}
