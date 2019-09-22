<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in suggestions"
        :movie="movie"
        :key="movie.movieId"
        :isInList="isInList(movie)"
        :isWatched="isWatched(movie)"
        @onAdd="handleAdd"
        @onClickWatched="handleWatched"
      />
    </div>
  </q-page>
</template>
<script>
import MovieCard from '../components/MovieCard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageSuggestions',
  components: { MovieCard },
  mounted () {
    this.suggestionsMovies()
  },
  computed: {
    ...mapState({
      myList: state => state.movie.myList,
      suggestions: state => state.movie.suggestions
    })
  },
  methods: {
    ...mapActions({
      suggestionsMovies: 'movie/suggestionsMovies',
      addWatchedToMovie: 'movie/addWatchedToMovie',
      addMovieToMyList: 'movie/addMovieToMyList'
    }),
    handleAdd (movie) {
      this.addMovieToMyList(movie).then(() => {
        this.$forceUpdate()
      })
    },
    handleWatched (movie) {
      this.addWatchedToMovie(movie).then(() => {
        this.$forceUpdate()
      })
    },
    isInList (movie) {
      return this.myList.some(({ movieId, wantWatch }) => (movieId === movie.id) && wantWatch)
    },
    isWatched (movie) {
      return this.myList.some(({ movieId, watched }) => (movieId === movie.id) && watched)
    }
  }
}
</script>
