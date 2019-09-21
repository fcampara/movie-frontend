<template>
  <q-input v-model="date" ref="input" :label="label" maxlength="10" v-bind="_config.input">
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
