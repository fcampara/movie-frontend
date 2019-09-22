<template>
  <q-card>
    <q-img  :src="`${movieURLImg}${movie.poster_path}`"/>

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="add"
        class="absolute"
        style="top: 0; right: 28px; transform: translateY(-50%);"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ movie.title }}</div>
        <div class="col-auto text-grey q-pt-md">
          {{ $t('addMyList') }}
        </div>
      </div>

      <div class="text-subtitle1">
        <q-icon name="fab fa-imdb" class="q-mr-md" size="3rem"/>
        <span>{{ movie.vote_average }}</span>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle1">{{ $t('releaseDate') }} {{ movie.release_date }}</div>
      <div class="text-subtitle2 full-height text-grey">{{ movie.overview }}</div>
    </q-card-section>

    <q-card-actions class="actions">
      <q-btn flat round icon="event" v-close-popup />
      <q-btn flat v-close-popup>5:30PM</q-btn>
      <q-btn flat v-close-popup>7:30PM</q-btn>
      <q-btn flat v-close-popup>9:00PM</q-btn>
      <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { movieURLImg } from '../constants/envKeys'
export default {
  props: {
    movie: Object
  },
  data: () => ({
    movieURLImg
  })
}
</script>
