<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in moviesDiscovery"
        :movie="movie"
        :isInList="isInList(movie)"
        :key="movie.id"
        @onAdd="handleAdd"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MovieCard from '../components/MovieCard'
export default {
  name: 'PageIndex',
  components: { MovieCard },
  computed: {
    ...mapState({
      moviesDiscovery: state => state.movie.discovery.results,
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({

      addMovieToMyList: 'movie/addMovieToMyList'
    }),
    handleAdd (movie) {
      this.addMovieToMyList(movie).then(() => {
        this.$forceUpdate()
      })
    },
    isInList (movie) {
      console.log('isInList')
      console.log(this.myList)
      return this.myList.some(({ movieId }) => movieId === movie.id)
    }
  }
}
</script>
