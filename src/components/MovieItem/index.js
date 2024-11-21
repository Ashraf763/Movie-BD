import './index.css'

const MovieItem = props => {
  const {details, onClickMovieDetails} = props
  // const {title, posterPath, voteAverage, id} = details

  const onClickMovie = () => {
    onClickMovieDetails(details)
  }

  return (
    <li className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}.jpg`}
        alt={details.title}
        className="poster-image"
      />
      <h2 className="title">{details.original_title}</h2>
      <p className="rating">Rating: {details.vote_average}</p>
      <button type="button" className="view-details-btn" onClick={onClickMovie}>
        View Details
      </button>
    </li>
  )
}

export default MovieItem
