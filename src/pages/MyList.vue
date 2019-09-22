<template>
  <q-page>
    <div class="container--movie-card">
      <MovieCard
        v-for="movie in formattedMyList"
        :movie="movie"
        :key="movie.movieId"
        @onRemove="handleRemove"
        @onClickWatched="handleWatched"
      />
    </div>
  </q-page>
</template>
<script>
import { extend } from 'quasar'
import MovieCard from '../components/MovieCard'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PageMyList',
  components: { MovieCard },
  mounted () {
    this.setMyList()
  },
  data: () => ({
    formattedMyList: []
  }),
  computed: {
    ...mapState({
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({
      deleteMovieFromMyList: 'movie/deleteMovieFromMyList',
      addWatchedToMovie: 'movie/addWatchedToMovie'
    }),
    setMyList () {
      const myList = extend([], this.myList)
      this.formattedMyList = myList.filter(({ wantWatch }) => wantWatch)
      this.$forceUpdate()
    },
    handleRemove (movie) {
      movie = extend({}, movie)
      this.deleteMovieFromMyList(movie).then(() => {
        this.setMyList()
      })
    },
    handleWatched (movie) {
      movie = extend({}, movie)
      this.addWatchedToMovie(movie).then(() => {
        this.setMyList()
      })
    }
  }
}
</script>
