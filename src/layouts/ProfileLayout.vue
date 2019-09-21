<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container class="row justify-center items-center col-12">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  beforeMount () {
    this.getProfile()
  },
  methods: {
    ...mapActions({
      getProfile: 'profile/getProfile'
    })
  }
}
</script>
