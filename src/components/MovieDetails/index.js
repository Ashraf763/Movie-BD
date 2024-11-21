import './index.css'

import {useEffect, useState} from 'react'
import LoadingView from '../LoadingView'

const MovieDetails = props => {
  const [movieDetails, setMovieDetails] = useState([])
  const [castDetails, setCastDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {history} = props
  const {location} = history
  const {pathname} = location

  useEffect(() => {
    const fetchSingleMovieDetails = async () => {
      const apiKey = '6c1eae73214f2615e9c9a48995b1afbf'
      const url = `https://api.themoviedb.org/3/movie${pathname}?api_key=${apiKey}&language=en-US`
      const response = await fetch(url)
      const data = await response.json()

      const casturl = `https://api.themoviedb.org/3/movie${pathname}/credits?api_key=${apiKey}&language=en-US`
      const castResponse = await fetch(casturl)
      const castData = await castResponse.json()
      console.log(castData.cast)
      if (response.ok && castResponse.ok) {
        setMovieDetails(data)
        setCastDetails(castData.cast)
        setIsLoading(false)
      }
    }

    fetchSingleMovieDetails()
  }, [pathname])

  const renderSuccessView = () => (
    <div className="movie-details-container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}.jpg`}
          alt={movieDetails.title}
          className="movie-poster-image"
        />

        <div className="text-container">
          <h1>Movie: {movieDetails.title}</h1>

          <ul className="genre-container">
            {movieDetails.genres.map(each => (
              <li className="genre" key={each.id}>
                {each.name}
              </li>
            ))}
          </ul>
          <p className="para">
            Overview: <span>{movieDetails.overview}</span>
          </p>

          <p className="para">
            Release Date: <span>{movieDetails.release_date}</span>
          </p>
          <p className="para">
            Rating: <span>{movieDetails.vote_average}</span>
          </p>
          <p className="para">
            Duration: <span>{movieDetails.runtime} Minutes</span>
          </p>
        </div>
      </div>

      <div className="cast-container">
        <h1 className="cast-heading">Casts</h1>
        <hr />

        <ul className="casts">
          {castDetails.map(each => (
            <li className="each-cast" key={each.credit_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${each.profile_path}.jpg`}
                alt={each.name}
                className="cast-image"
              />
              <p className="original-name">{each.original_name}</p>
              <p className="character-name">{each.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return isLoading ? <LoadingView /> : renderSuccessView()
}
export default MovieDetails
