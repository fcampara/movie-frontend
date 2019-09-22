<template>
  <q-layout view="lHr lpR lFr">

    <q-header elevated class="row bg-black text-white justify" height-hint="98">
      <q-toolbar>
        <q-toolbar-title  v-if="$q.screen.gt.sm">
          <q-avatar class="q-mr-md">
            <q-icon name="fas fa-film" style="font-size: 2rem" />
          </q-avatar>
          Smart Movies
        </q-toolbar-title>
        <q-space/>
        <div class="toolbar-input-container row no-wrap q-mt-xs">
          <q-input v-bind="_config.input" class="full-width" :label="$t('search')">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </div>
        <q-space/>
        <q-btn :label="$t('exit')" icon="fas fa-sign-out-alt" @click="handleLogout()"/>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" :label="$t('discovery')" />
        <q-route-tab to="/suggestions" :label="$t('suggestions')" />
        <q-route-tab to="/myList" :label="$t('myList')" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-card class="workspace">
        <router-view />
      </q-card>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  async created () {
    const { id, name } = this.profile

    if (!id && !name) return this.$router.replace('/profile')
    await this.listDiscovery()
    this.getMyListMovies()
  },
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      listDiscovery: 'movie/moviesDicovery',
      getMyListMovies: 'movie/getMyListMovies'
    }),
    handleLogout () {
      this.logout()
      this.$router.push('/auth')
    }
  }
}
</script>

<style lang="sass">
.toolbar-input-container
    min-width: 100px
    width: 55%
</style>
