import { LocalStorage } from 'quasar'
import { token, userInfo } from '../../constants/localStorage'

export default {
  user: LocalStorage.getItem(userInfo) || null,
  token: LocalStorage.getItem(token) || null
}
