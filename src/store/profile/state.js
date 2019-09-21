import { LocalStorage } from 'quasar'
import { profileName, profileId } from '../../constants/localStorage'

export default {
  list: [],
  id: LocalStorage.getItem(profileId) || null,
  name: LocalStorage.getItem(profileName) || null
}
