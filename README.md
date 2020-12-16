# dayjs-plugin-calendar-sets

## install

```sh
npm install dayjs-plugin-calendar-sets --save
npm install dayjs --save
```

## usage

```ts
import dayjs from 'dayjs'
import { calendarSet } from 'dayjs-plugin-calendar-sets'

dayjs.extend(calendarSet)
// get 11th month data
dayjs().calendarSet({ month: 11 })
```

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