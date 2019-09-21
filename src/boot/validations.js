import { i18n } from './i18n'
import isEmail from 'validator/lib/isEmail'

export default async ({ Vue }) => {
  Vue.mixin({
    methods: {
      _resetValidation: (data) => {
        for (let key in data) {
          let ref = data[key]
          if (ref) {
            if (typeof ref.hasError === 'undefined') {
              ref = ref.$refs.input
            }
            if (!ref.rules) return console.error(`You can't pass a ref to validate with out rules - ${ref.label}`)
            ref.resetValidation()
          }
        }
      },
      _isValidForm: (data) => {
        let firstInvalidRef = null
        for (let key in data) {
          let ref = data[key]
          if (ref) {
            if (typeof ref.hasError === 'undefined') {
              ref = ref.$refs.input
            }

            if (!ref.rules) return console.error(`You can't pass a ref to validate with out rules`)
            const isValid = !ref.validate()
            if (firstInvalidRef === null && isValid) firstInvalidRef = ref
          }
        }
        if (firstInvalidRef) firstInvalidRef.focus()
        for (let key in data) {
          let ref = data[key]
          if (ref) {
            if (typeof ref.hasError === 'undefined') {
              ref = ref.$refs.input
            }

            if (ref.hasError) {
              return false
            }
          }
        }
        return true
      },
      _getRules: () => ({
        _isRequired: [val => !!val || i18n.t('fieldIsRequired')],
        _isEmail: [val => !!isEmail(val) || i18n.t('invalidEmail')]
      }),
      _log (data) {
        console.log(data)
      }
    }
  })
}
