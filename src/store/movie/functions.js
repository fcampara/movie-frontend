import { i18n } from '../../boot/i18n'

export const formatMovies = (value) => {
  const { id, movieId, title, posterPath, voteAverage, watched, releaseDate, overview, genreIds, wantWatch = false } = value
  return {
    movieId: movieId || id,
    movieName: title,
    wantWatch,
    watched,
    genres: genreIds,
    details: {
      posterPath,
      voteAverage,
      releaseDate,
      overview
    }
  }
}

export const getLanguage = () => i18n.locale
