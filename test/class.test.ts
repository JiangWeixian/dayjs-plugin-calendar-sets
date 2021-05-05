import CalendarSets from '../src/index'
import dayjs from 'dayjs'

dayjs.extend(CalendarSets)

describe('calendar set', () => {
  it('calendar set month should return chunked array in default', () => {
    const sets = dayjs.calendarSets().month({ month: 11 })
    expect(Array.isArray(sets)).toBe(true)
    expect(sets.every((v) => Array.isArray(v))).toBe(true)
  })

  it('calendar set month should support return array', () => {
    const sets = dayjs.calendarSets().month({ month: 11, chunked: false })
    expect(Array.isArray(sets)).toBe(true)

    expect(sets.every((v) => !Array.isArray(v))).toBe(true)
  })

  it('calendar set month should support define year', () => {
    const sets = dayjs.calendarSets().month({ month: 11, chunked: false, year: 2020 })
    console.log(sets)
    sets.forEach((item) => {
      if (item) {
        expect(item.startsWith('2020'))
      }
    })
  })

  it('calendar set year should work fine', () => {
    const sets = dayjs.calendarSets().year()
    expect(Object.keys(sets).length).toBe(12)
    Object.values(sets).forEach((data) => {
      expect(data.every((v) => Array.isArray(v))).toBe(true)
    })
  })

  it('calendar set year should support disable year', () => {
    const sets = dayjs.calendarSets().year({ chunked: false })
    Object.values(sets).forEach((data) => {
      expect(data.every((v) => !Array.isArray(v))).toBe(true)
    })
  })

  it('calendar set year should support define year', () => {
    const sets = dayjs.calendarSets().year({ chunked: false, year: 2020 })
    sets[0].forEach((item) => {
      if (item) {
        expect(item.startsWith('2020')).toBe(true)
      }
    })
  })
})
