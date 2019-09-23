<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in moviesDiscovery"
        :movie="movie"
        :isInList="isInList(movie)"
        :isWatched="isWatched(movie)"
        :key="movie.id"
        @onAdd="handleAdd"
        @onClickWatched="handleWatched"
      />
    </div>
  </q-page>
</template>

<script>
import { extend } from 'quasar'
import { mapActions, mapState } from 'vuex'
import MovieCard from '../components/MovieCard'
export default {
  name: 'PageIndex',
  components: { MovieCard },
  computed: {
    ...mapState({
      moviesDiscovery: state => state.movie.discovery,
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({
      addWatchedToMovie: 'movie/addWatchedToMovie',
      addMovieToMyList: 'movie/addMovieToMyList'
    }),
    handleAdd (movie) {
      movie = extend({}, movie)
      this.addMovieToMyList(movie).then(() => {
        this.$forceUpdate()
      })
    },
    handleWatched (movie) {
      movie = extend({}, movie)
      this.addWatchedToMovie(movie).then(() => {
        this.$forceUpdate()
      })
    },
    isInList (movie) {
      movie = extend({}, movie)
      return this.myList.some(({ movieId, wantWatch }) => (movieId === movie.id) && wantWatch)
    },
    isWatched (movie) {
      movie = extend({}, movie)
      return this.myList.some(({ movieId, watched }) => (movieId === movie.id) && watched)
    }
  }
}
</script>
