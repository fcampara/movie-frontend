<template>
  <q-card>
    <q-img  :src="`${movieURLImg}${movie && movie.posterPath}`"/>

    <q-card-section>
      <q-btn
        v-if="!isInList"
        fab
        :color="isMyList ? 'negative' : 'primary'"
        :icon="isMyList ? 'delete' : 'add'"
        class="absolute"
        style="top: 0; right: 28px; transform: translateY(-50%);"
        @click="isMyList ? $emit('onRemove', movie) : $emit('onAdd', movie)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ movie && movie.title || movie && movie.movieName }}</div>
        <div v-if="!isInList" class="col-auto text-grey q-pt-md">
          {{ isMyList ? $t('removeMyList') : $t('addMyList')}}
        </div>
      </div>

      <div class="text-subtitle1">
        <q-icon name="fab fa-imdb" class="q-mr-md" size="3rem"/>
        <span>{{ movie && movie.voteAverage }}</span>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle1">{{ $t('releaseDate') }} {{ movie && movie.releaseDate }}</div>
      <div class="text-subtitle2 full-height text-grey">{{ movie && movie.overview }}</div>
    </q-card-section>

    <q-card-actions class="row justify-around actions">
      <q-btn flat :label="$t('schedule')" />
      <q-btn
        flat
        :label="$t('watched')"
        :color="isWatched || movie && movie.watched ? 'positive' : 'primary'"
        @click="$emit('onClickWatched', { ...movie, watched: isWatched || movie.watched })"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { movieURLImg } from '../constants/envKeys'
export default {
  props: {
    movie: Object,
    isInList: Boolean,
    isWatched: Boolean
  },
  computed: {
    isMyList () {
      return this.movie && !!this.movie.movieId
    }
  },
  data: () => ({
    movieURLImg
  })
}
</script>
