import { notify } from '../utils/notify'

export default async ({ Vue }) => {
  Vue.mixin({
    methods: {
      _notify (message, success) {
        notify(message, success)
      }
    }
  })
}
