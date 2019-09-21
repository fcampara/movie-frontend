<template>
  <q-layout view="lHr lpR lFr">

    <q-page-container class="row justify-center items-center">
      <q-card class="workspace--login shadow-11">
        <router-view />
      </q-card>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
