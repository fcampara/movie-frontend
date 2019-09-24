<template>
  <q-input
    v-model="localDate"
    ref="input"
    :label="label"
    maxlength="10"
    :error="error"
    mask="##/##/####"
    :hint="error ? 'Invalid Date' : ''"
    v-bind="_config.input"
    @keyup="getDate"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="localDate" :mask="mask" @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
export default {
  props: {
    value: String,
    label: String
  },
  mounted () {
    this.localDate = this.value
  },
  data: () => ({
    error: false,
    message: '',
    localDate: ''
  }),
  computed: {
    mask () {
      const { isoName } = this.$q.lang
      return isoName === 'pt-br' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
    }
  },
  methods: {
    getDate () {
      const { isoName } = this.$q.lang
      const { day, month, year } = this.getDesctructDate(isoName)
      const dateIso = new Date(year, month, day).toLocaleDateString(isoName)
      const dateEnUs = new Date(year, month, day).toLocaleDateString('en-us')
      if (dateIso === 'Invalid Date') {
        this.error = true
        this.$emit('input', this.localDate)
        return this.localDate
      }

      if (dateIso.length < 10) {
        this.error = true
        this.$emit('input', dateIso)
        return dateIso
      }

      if (this.localDate.length === 10 && dateIso !== 'Invalid Date') this.error = false

      this.$emit('input', dateEnUs)
      return dateIso
    },
    getDesctructDate (isoName) {
      const splittedDate = this.localDate && this.localDate.split('/')
      if (isoName === 'pt-br') {
        return {
          day: splittedDate[0],
          month: (splittedDate[1] && splittedDate[1] - 1) || null,
          year: splittedDate[2]
        }
      } else {
        return {
          day: splittedDate[1],
          month: (splittedDate[0] && splittedDate[0] - 1) || null,
          year: splittedDate[2]
        }
      }
    }
  }
}
</script>
