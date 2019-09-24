<template>
  <div class="row justify-center">
    <q-card
      data-cy="profile-card"
      v-for="(profile, index) in profiles.list" :key="profile.id"
      @click="handleProfile(profile)"
    >
        <div class="row justify-center items-center col-12 q-mt-md">
        <q-icon name="person" size="8rem"/>
      </div>
      <span class="row justify-center items-center col-12 text-overline">
        {{ profile.name }}
      </span>
      <q-btn class="delete-button" :data-cy="`delete-${index}`" fab icon="close" color="negative" @click.stop.prevent="handleRemove(profile)"/>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
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
    ...mapMutations({
      setProfile: 'profile/setProfile'
    }),
    handleProfile (profile) {
      this.setProfile(profile)
      this.$router.replace('/home')
    },
    handleRemove ({ id }) {
      this.removeProfile({ id })
    }
  }
}
</script>
