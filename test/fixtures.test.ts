import dayjs from 'dayjs'
import CalendarSets from '../src/index'

dayjs.extend(CalendarSets)

it('fix #2, wrong date calendar sets', () => {
  const sets = dayjs.calendarSets({ year: 2023 }).month({ month: 0 })
  expect(sets).toMatchSnapshot()
})
