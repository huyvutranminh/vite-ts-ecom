import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  useEffect(() => {
    if (value) {
      setDate({
        day: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            value={value?.getDate() || date.day}
            onChange={handleChange}
            name='day'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-emerald-300'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={value?.getMonth() || date.month}
            onChange={handleChange}
            name='month'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-emerald-300'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            value={value?.getFullYear() || date.year}
            onChange={handleChange}
            name='year'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-emerald-300'
          >
            <option disabled>Năm</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
