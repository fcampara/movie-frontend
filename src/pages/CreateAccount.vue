<template>
  <q-page @keypress.enter="handleSubmit">
    <div class="row create-account q-px-xl q-mt-xl">
      <div class="row col-12 justify-center q-mb-md">
      </div>
        <q-input
        data-cy="name"
        v-model="form.name"
        class="col-12 q-mb-md"
        :label="`${$t('name')} *`"
        v-bind="_config.input"
        ref="name"
        :rules="_getRules()._isRequired"
      />
      <q-input
        data-cy="email"
        v-model="form.email"
        class="col-12"
        :label="`${$t('email')} *`"
        v-bind="_config.input"
        ref="email"
        :rules="_getRules()._isEmail"
      />
      <q-input
        data-cy="password"
        v-model="form.password"
        v-bind="_config.input"
        class="col-12"
        ref="password"
        type="password"
        :label="`${$t('password')} *`"
        :rules="_getRules()._isRequired"
      />
      <q-input
        data-cy="repassword"
        v-model="form.repeatPassword"
        v-bind="_config.input"
        class="col-12"
        ref="repeatPassword"
        type="password"
        :label="`${$t('confirmPassword')} *`"
        :rules="_getRules()._isRequired"
      />
      <CustomDatePicker
        data-cy="birthDay"
        v-model="form.birthDay"
        class="col-12"
        :label="`${$t('birthDay')} *`"
        :rules="_getRules().isRequired"
      />
      <q-btn
        data-cy="btn-create"
        class="bg-primary text-secondary full-width"
        :loading="loading"
        :label="$t('create')"
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
