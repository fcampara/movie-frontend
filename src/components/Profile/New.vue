<template>
  <div>
    <q-card data-cy="new-profile" class="row justify-center items-center" @click="show = true">
      <div class="row justify-center items-center col-12">
        <q-icon name="fas fa-plus-circle" size="8rem"/>
      </div>
    </q-card>
    <q-dialog v-model="show">
      <q-card @keyup.enter="handleSubmit">
        <q-card-section>
          <div class="row items-center">
            <div class="col text-h6 ellipsis">{{$t('creteNewProfile')}}</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="handleClose"/>
          </div>

        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input v-model="name" data-cy="name" v-bind="_config.input" :label="$t('name')" :rules="_getRules()._isRequired"/>
        </q-card-section>

        <q-card-actions class="row justify-end">
          <q-btn color="negative" data-cy="btn-cancel" :loading="loading" @click="handleClose">{{ $t('cancel') }}</q-btn>
          <q-btn color="positive" data-cy="btn-save" :loading="loading" @click="handleSubmit">{{ $t('save') }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { extend } from 'quasar'
import { mapActions } from 'vuex'
export default {
  data: () => ({
    show: false,
    loading: false,
    name: ''
  }),
  methods: {
    ...mapActions({
      createProfile: 'profile/createProfile'
    }),
    handleSubmit () {
      if (!this._isValidForm(this.$refs)) return false
      const name = extend({}, { name: this.name })
      this.loading = true
      this.createProfile(name).then(() => {
        this.handleClose()
      }).finally(() => {
        this.loading = false
      })
    },
    handleClose () {
      this.show = false
      this.loading = false
      this.name = ''
    }
  }
}
</script>
