<template>
  <q-page @keypress.enter="handleLogin">
    <div class="row justify-center items-center">
      <q-avatar class="col-12 q-mt-xl" icon="fas fa-film" size="10rem"/>
      <span class="text-overline">Smart Movies</span>
    </div>
    <div data-cy="form" class="column q-px-xl q-mt-xl">
      <q-input
        data-cy="email"
        v-model="email"
        :label="$t('email')"
        v-bind="_config.input"
        ref="email"
        :rules="_getRules()._isEmail"
      />
      <q-input
        data-cy="password"
        v-model="password"
        v-bind="_config.input"
        ref="password"
        type="password"
        :label="$t('password')"
        :rules="_getRules()._isRequired"
      />

      <div class="row col-12">
        <div class="col-md-6 col-12">
          <q-btn
            data-cy="bt-login"
            class="bg-primary text-secondary full-width"
            :loading="loading"
            :label="$t('logIn')"
            @click="handleLogin"
          />
        </div>
        <div class="col-md-6 col-12">
          <q-btn
            data-cy="bt-create-account"
            class="bg-secondary text-primary full-width"
            :label="$t('createAccount')"
            @click="() => $router.push('/auth/create')"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { extend } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'PageLogin',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      authLogin: 'auth/loginWithMailPassword'
    }),
    handleLogin () {
      if (!this._isValidForm(this.$refs)) return false
      this.loading = true
      const { email, password } = this
      const payload = extend({}, { email, password })
      this.authLogin(payload).then(() => {
        this.$router.replace('/home')
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
