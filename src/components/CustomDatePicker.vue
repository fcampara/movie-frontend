<template>
  <q-input
    v-model="localDate"
    ref="input"
    :label="label"
    maxlength="10"
    :error="error"
    mask="##/##/####"
    :hint="error ? 'Invalid Date' : ''"
    :rules="rules"
    v-bind="_config.input"
    @keyup="getDate"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
export default {
  props: {
    rules: Array,
    value: String,
    label: String
  },
  computed: {
    date: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', this._formatDate(newValue))
      }
    }
  }
}
</script>
