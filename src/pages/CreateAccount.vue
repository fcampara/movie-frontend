<template>
  <q-page @keypress.enter="handleSubmit">
    <div class="row q-px-xl q-mt-xl">
      <div class="row col-12 justify-center q-mb-md">
        teste
      </div>
        <q-input
        v-model="form.name"
        class="col-12 q-mb-md"
        :label="`${$t('name')} *`"
        v-bind="_config.input"
        ref="name"
        :rules="_getRules()._isRequired"
      />
      <q-input
        v-model="form.email"
        class="col-12"
        :label="`${$t('email')} *`"
        v-bind="_config.input"
        ref="email"
        :rules="_getRules()._isEmail"
      />
      <q-input
        v-model="form.password"
        v-bind="_config.input"
        class="col-12"
        ref="password"
        type="password"
        :label="`${$t('password')} *`"
        :rules="_getRules()._isRequired"
      />
      <q-input
        v-model="form.repeatPassword"
        v-bind="_config.input"
        class="col-12"
        ref="repeatPassword"
        type="password"
        :label="`${$t('confirmPassword')} *`"
        :rules="_getRules()._isRequired"
      />
      <CustomDatePicker v-model="form.birthDay" class="col-12" :label="`${$t('birthDay')} *`"/>
      <q-btn
        class="bg-primary text-secondary full-width"
        :loading="loading"
        :label="$t('logIn')"
        @click="handleSubmit"
      />
    </div>
  </q-page>
</template>

<script>
import { extend } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'PageCreateAccount',
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      birthDay: '',
      repeatPassword: ''
    },
    loading: false
  }),
  methods: {
    ...mapActions({
      createAccount: 'auth/createAccount'
    }),
    handleSubmit () {
      if (!this._isValidForm(this.$refs)) return false
      this.loading = true
      const { form } = this
      const payload = extend({}, form)
      this.createAccount(payload).then((data) => {
        this.$router.push('/auth')
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
