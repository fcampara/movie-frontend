import { Quasar } from 'quasar'

export const formatDate = (value) => {
  const { isoName } = Quasar.lang
  if (value.length < 10) return value
  const date = new Date(value)

  console.log(date.getDay())
  return date.getDay() ? new Intl.DateTimeFormat(isoName, {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric'
  }).format(date) : value
}

export const getPattern = (value) => {

}
