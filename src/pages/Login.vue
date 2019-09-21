<template>
  <q-page @keypress.enter="handleLogin">
    <div class="row justify-center items-center">
      <q-avatar class="col-12 q-mt-xl" icon="fas fa-film" size="10rem"/>
      <span class="text-overline">Smart Movies</span>
    </div>
    <div class="column q-px-xl q-mt-xl q-gutter-md">
      <q-input
        v-model="email"
        :label="$t('email')"
        v-bind="_config.input"
        ref="email"
        :rules="_getRules()._isEmail"
      />
      <q-input
        v-model="password"
        v-bind="_config.input"
        ref="password"
        type="password"
        :label="$t('password')"
        :rules="_getRules()._isRequired"
      />
      <q-btn class="bg-primary text-secondary" :loading="loading" :label="$t('logIn')" @click="handleLogin"/>
    </div>
  </q-page>
</template>

<script>
import { extend } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      authLogin: 'Auth/loginWithMailPassword'
    }),
    handleLogin () {
      if (!this._isValidForm(this.$refs)) return false
      this.loading = true
      const { email, password } = this
      const payload = extend({}, { email, password })
      this.authLogin(payload).then(() => {
        this.$router.replace('/admin')
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
