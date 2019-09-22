<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard v-for="movie in moviesDiscovery" :movie="movie" :key="movie.id"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MovieCard from '../components/MovieCard'
export default {
  name: 'PageIndex',
  components: { MovieCard },
  mounted () {
    this.listDiscovery()
  },
  computed: {
    ...mapState({
      moviesDiscovery: state => state.movie.discovery.results
    })
  },
  methods: {
    ...mapActions({
      listDiscovery: 'movie/moviesDicovery'
    })
  }
}
</script>
