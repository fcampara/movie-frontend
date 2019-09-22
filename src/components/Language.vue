<template>
  <q-select
    class="q-mr-md"
    v-bind="_config.input"
    v-model="lang"
    bg-color="white"
    :options="langOptions"
    :label="$t('language')"
    emit-value
    style="min-width: 150px"
  />
</template>

<script>
import { i18n } from '../boot/i18n'
import { language } from '../constants/localStorage'
import { mapActions } from 'vuex'
import { LocalStorage } from 'quasar'
export default {
  data: () => ({
    langOptions: [
      { label: 'English (US)', value: 'en-us' },
      { label: 'Português (BR)', value: 'pt-br' }
    ]
  }),
  computed: {
    lang: {
      get () {
        return this.$q.lang.nativeName
      },
      set (isoName) {
        import(`quasar/lang/${isoName}`).then(lang => {
          this.$q.lang.set(lang.default)
        })
        i18n.locale = isoName
        LocalStorage.set(language, isoName)
        this.reloadMovies()
      }
    }
  },
  methods: {
    ...mapActions({
      listDiscovery: 'movie/moviesDicovery',
      getMyListMovies: 'movie/getMyListMovies'
    }),
    reloadMovies () {
      this.listDiscovery()
      this.getMyListMovies()
    }
  }
}
</script>
