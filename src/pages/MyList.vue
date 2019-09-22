<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in myList"
        :movie="movie"
        :key="movie.movieId"
        @onAdd="handleAdd"
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
  mounted () {
    this.getMyListMovies()
  },
  computed: {
    ...mapState({
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({
      getMyListMovies: 'movie/getMyListMovies'
    })
  }
}
</script>
