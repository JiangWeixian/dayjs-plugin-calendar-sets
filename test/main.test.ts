import { calendarSet } from '../src/index'
import dayjs from 'dayjs'

dayjs.extend(calendarSet)

describe('calendar set', () => {
  it('calendar set should return chunked array', () => {
    const now: any = dayjs()
    const sets = now.calendarSet({ month: 11 })
    expect(Array.isArray(sets)).toBe(true)
    expect(sets.every(v => Array.isArray(v))).toBe(true)
  })

  it('each chunk length should be 7', () => {
    const now: any = dayjs()
    const sets = now.calendarSet({ month: 11 })
    expect(sets.every(v => v.length === 7)).toBe(true)
  })
})
