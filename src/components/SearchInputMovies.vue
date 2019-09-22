<template>
  <div class="toolbar-input-container row justify-center align-center q-mt-xs">
    <q-select
      class="full-width"
      v-bind="_config.input"
      v-model="movie"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :label="$t('search')"
      :options="options"
      @filter="filterFn"
    >
      <template  v-slot:option="scope">
        <q-item clickable v-ripple v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="`${movieURLImg}/${scope.opt.posterPath}`"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ scope.opt.title }}</q-item-label>
            <q-item-label caption lines="2">
              {{ scope.opt.overview }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            {{ scope.opt.releaseDate }}
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ $t('noResult')}}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-dialog v-model="show">
      <MovieCard
        class="dialog--movie-card"
        :movie="movie"
        :isInList="isInList"
        :isWatched="isWatched"
        @onAdd="handleAdd"
        @onClickWatched="handleWatched"
      />
    </q-dialog>
  </div>
</template>

<script>
import { extend } from 'quasar'
import MovieCard from './MovieCard'
import { movieURLImg } from '../constants/envKeys'
import { mapActions, mapState } from 'vuex'
export default {
  // name: 'ComponentName',
  components: { MovieCard },
  data () {
    return {
      show: false,
      movieURLImg,
      movie: null,
      isInList: false,
      isWatched: false,
      options: []
    }
  },
  computed: {
    ...mapState({
      myList: state => state.movie.myList
    })
  },
  methods: {
    ...mapActions({
      searchMovies: 'movie/searchMovies',
      addMovieToMyList: 'movie/addMovieToMyList',
      addWatchedToMovie: 'movie/addWatchedToMovie'
    }),
    filterFn (val, update, abort) {
      update(async () => {
        if (val === '') {
          this.options = []
        } else {
          const { results } = await this.searchMovies(val)
          this.options = results
        }
      })
    },
    handleAdd (movie) {
      movie = extend({}, movie)
      this.addMovieToMyList(movie).then(() => {
        this.show = false
      })
    },
    checkIsInList (movie) {
      movie = extend({}, movie)
      return this.myList.some(({ movieId, wantWatch }) => (movieId === movie.id) && wantWatch)
    },
    checkIsWatched (movie) {
      movie = extend({}, movie)
      return this.myList.some(({ movieId, watched }) => (movieId === movie.id) && watched)
    },
    handleWatched (movie) {
      movie = extend({}, movie)
      this.addWatchedToMovie(movie).then(() => {
        this.show = false
      })
    }
  },
  watch: {
    movie (newValue) {
      if (newValue) {
        this.isInList = this.checkIsInList(newValue)
        this.isWatched = this.checkIsWatched(newValue)
        this.show = true
      }
    },
    show (newValue) {
      if (!newValue) {
        this.movie = null
      }
    }
  }
}
</script>
<style lang="sass">
.toolbar-input-container
  min-width: 100px
  width: 55%
</style>
