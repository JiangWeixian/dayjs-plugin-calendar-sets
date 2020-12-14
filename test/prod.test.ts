import { calendarSet } from '../src/index'
import dayjs from 'dayjs'

dayjs.extend(calendarSet)

describe('calendar set', () => {
  it('12th', () => {
    const now: any = dayjs()
    console.log(now.calendarSet({ month: 11 }))
  })
})