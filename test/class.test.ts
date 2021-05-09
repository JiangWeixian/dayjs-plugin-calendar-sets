import CalendarSets from '../src/index'
import dayjs from 'dayjs'

dayjs.extend(CalendarSets)

describe('calendar set', () => {
  it('method.month should return chunked array in default', () => {
    const sets = dayjs.calendarSets().month({ month: 11 })
    expect(Array.isArray(sets)).toBe(true)
    expect(sets.every((v) => Array.isArray(v))).toBe(true)
  })

  it('method.month un-chunked array should not contain empty string', () => {
    const sets = dayjs.calendarSets().month({ month: 11, chunked: false })
    expect(Array.isArray(sets)).toBe(true)
  })

  it('method.month should support return array', () => {
    const sets = dayjs.calendarSets().month({ month: 11, chunked: false })
    expect(Array.isArray(sets)).toBe(true)

    expect(sets.every((v) => !Array.isArray(v))).toBe(true)
  })

  it('method.month should support define year', () => {
    const sets = dayjs.calendarSets().month({ month: 11, chunked: false, year: 2020 })
    sets.forEach((item) => {
      if (item) {
        expect(item.startsWith('2020'))
      }
    })
  })

  it('method.year should work fine', () => {
    const sets = dayjs.calendarSets().year()
    expect(Object.keys(sets).length).toBe(12)
    Object.values(sets).forEach((data) => {
      expect(data.every((v) => Array.isArray(v))).toBe(true)
    })
  })

  it('method.year should support chunked=false', () => {
    const sets = dayjs.calendarSets().year({ chunked: false })
    Object.values(sets).forEach((data) => {
      expect(data.every((v) => !Array.isArray(v))).toBe(true)
    })
  })

  it('method.year should support define year', () => {
    const sets = dayjs.calendarSets().year({ chunked: false, year: 2020 })
    sets[0].forEach((item) => {
      if (item) {
        expect(item.startsWith('2020')).toBe(true)
      }
    })
  })

  it('constructor should support define default year and month', () => {
    expect(dayjs.calendarSets({ month: 2, year: 2020 }).$month).toBe(2)
    expect(dayjs.calendarSets({ month: 2, year: 2020 }).$year).toBe(2020)
  })

  it('constructor should support define default format', () => {
    const instance = dayjs.calendarSets({ format: (v) => dayjs(v).valueOf() })
    const sets = instance.month({ chunked: false })
    expect(Array.isArray(sets)).toBe(true)
    expect(sets.every((v) => typeof v === 'number')).toBe(true)
  })

  it('method.current should work', () => {
    const sets = dayjs.calendarSets({ month: 2, year: 2020 }).current()
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2020-03') : true))
      }),
    ).toBe(true)
  })

  it('method.next should increase month', () => {
    const sets = dayjs.calendarSets({ month: 2, year: 2020 }).next()
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2020-04') : true))
      }),
    ).toBe(true)
  })

  it('method.next increase month=11, will also increase year', () => {
    const sets = dayjs.calendarSets({ month: 11, year: 2020 }).next()
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2021-01') : true))
      }),
    ).toBe(true)
  })

  it('method.prev should decrease month', () => {
    const sets = dayjs.calendarSets({ month: 2, year: 2020 }).prev()
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2020-02') : true))
      }),
    ).toBe(true)
  })

  it('method.prev decrease month=0, will also decrease year', () => {
    const sets = dayjs.calendarSets({ month: 0, year: 2020 }).prev()
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2019-12') : true))
      }),
    ).toBe(true)
  })

  it('method.prev should support decrease year', () => {
    const sets = dayjs.calendarSets({ month: 2, year: 2020 }).prev({ type: 'year' })
    expect(Array.isArray(sets)).toBe(true)
    expect(
      sets.every((set) => {
        return set.every((item) => (item ? item.startsWith('2019-03') : true))
      }),
    ).toBe(true)
  })

  it('method.reset should work', () => {
    dayjs.calendarSets({ month: 2, year: 2020 }).reset()
    expect(dayjs.calendarSets({ month: 2, year: 2020 }).reset().$month).toBe(dayjs().month())
    expect(dayjs.calendarSets({ month: 2, year: 2020 }).reset().$year).toBe(dayjs().year())
  })
})
