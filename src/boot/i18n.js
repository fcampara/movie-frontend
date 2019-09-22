import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { LocalStorage, Quasar } from 'quasar'
import { language } from '../constants/localStorage'

Vue.use(VueI18n)

const isoName = LocalStorage.getItem(language) || 'pt-br'

import(`quasar/lang/${isoName}`).then(lang => {
  Quasar.lang.set(lang.default)
})

const i18n = new VueI18n({
  locale: isoName,
  fallbackLocale: 'pt-br',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
