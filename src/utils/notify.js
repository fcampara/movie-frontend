import { Notify } from 'quasar'

export const notify = (message, success = true) => {
  const icon = success ? 'far fa-smile-beam' : 'fas fa-exclamation-triangle'
  const color = success ? 'green-4' : 'red-5'
  Notify.create({
    color,
    textColor: 'white',
    icon,
    actions: [{ icon: 'close', color: 'white' }],
    message
  })
}
