# dayjs-plugin-calendar-sets

## install

```sh
npm install dayjs-plugin-calendar-sets dayjs --save
npm install dayjs --save
```

## usage

### `CalendarSets`

```ts
import CalendarSets from 'dayjs-plugin-calendar-sets'

dayjs.extend(CalendarSets)
const sets = dayjs.calendarSets()
```

params of `calendarSets()`

- `month` - define current `month`
- `year` - define current `year`

### `month`

generate array of month dates

```ts
import dayjs from 'dayjs'
import CalendarSets from 'dayjs-plugin-calendar-sets'

dayjs.extend(CalendarSets)
// get 11th month data
const sets = dayjs.calendarSets().month({ month: 11 })
```

params is

- `month`, month index start from `0`
- `year`, current year, default is `this year`
- `chunked`, creates an array of dates split into groups the length of `7`, default `true`

will generate month data like 

```ts
[
  [
    '',
    '2020-12-01',
    '2020-12-02',
    '2020-12-03',
    '2020-12-04',
    '2020-12-05',
    '2020-12-06'
  ],
  [
    '2020-12-07',
    '2020-12-08',
    '2020-12-09',
    '2020-12-10',
    '2020-12-11',
    '2020-12-12',
    '2020-12-13'
  ],
  [
    '2020-12-14',
    '2020-12-15',
    '2020-12-16',
    '2020-12-17',
    '2020-12-18',
    '2020-12-19',
    '2020-12-20'
  ],
  [
    '2020-12-21',
    '2020-12-22',
    '2020-12-23',
    '2020-12-24',
    '2020-12-25',
    '2020-12-26',
    '2020-12-27'
  ],
  [ '2020-12-28', '2020-12-29', '2020-12-30', '2020-12-31' ]
]
```

### `year`

generate `object` of year dates

```ts
// get 2020 year data
const sets = dayjs.calendarSets().year({ year: 2020 })
```

params:

- `year`, define current year
- `chunked`, each month dates will split into groups the length of `7`, default `true`

### `current`

```ts
const sets = dayjs.calendarSets().current()
```

generate array of current `year-month` dates

params:

- `chunked`, creates an array of dates split into groups the length of `7`, default `true`

### `next` and `prev`

generate array of prev or next `year-month` dates

```ts
const instance = dayjs.calendarSets({ month: 11, year: 2020 })
instance.prev()
instance.next()
```

- `type`, default `month`
  - if `type` = `year`, will also `increase or decrease` year
- `chunked`, each month dates will split into groups the length of `7`, default `true`