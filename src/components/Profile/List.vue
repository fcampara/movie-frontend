<template>
  <div class="row justify-center">
    <q-card
      v-for="profile in profiles.list" :key="profile.id"
      @click="handleProfile(profile)"
    >
        <div class="row justify-center items-center col-12 q-mt-md">
        <q-icon name="person" size="8rem"/>
      </div>
      <span class="row justify-center items-center col-12 text-overline">
        {{ profile.name }}
      </span>
      <q-btn class="delete-button" fab icon="close" color="negative" @click="handleRemove(profile)"/>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ProfileList',
  computed: {
    ...mapState({
      profiles: state => state.profile
    })
  },
  methods: {
    ...mapActions({
      removeProfile: 'profile/removeProfile'
    }),
    handleProfile ({ id }) {
      console.log(id)
    },
    handleRemove ({ id }) {
      this.removeProfile({ id })
    }
  }
}
</script>
