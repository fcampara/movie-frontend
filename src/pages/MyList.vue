<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in myList"
        :movie="movie"
        :key="movie.movieId"
        @onRemove="handleRemove"
      />
    </div>
  </q-page>
</template>
<script>
import MovieCard from '../components/MovieCard'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PageMyList',
  components: { MovieCard },
  computed: {
    ...mapState({
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({
      deleteMovieFromMyList: 'movie/deleteMovieFromMyList'
    }),
    handleRemove (movie) {
      this.deleteMovieFromMyList(movie)
    }
  }
}
</script>
