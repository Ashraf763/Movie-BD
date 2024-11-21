import './index.css'
import {useEffect, useState} from 'react'
import LoadingView from '../LoadingView'
import MovieItem from '../MovieItem'

const SearchResults = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const {history} = props
  const {location} = history
  const {search} = location
  const searchVal = search.substring(1)

  useEffect(() => {
    const fetchSearchResults = async () => {
      const apiKey = '6c1eae73214f2615e9c9a48995b1afbf'
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchVal}&page=1`
      const response = await fetch(url)
      const responseData = await response.json()

      if (response.ok) {
        // const updatedData = responseData.results.map(each => ({
        //   adult: each.adult,
        //   backdropPath: each.backdrop_path,
        //   genreIds: each.genre_ids,
        //   id: each.id,
        //   originalLanguage: each.original_language,
        //   originalTitle: each.original_title,
        //   overview: each.overview,
        //   popularity: each.popularity,
        //   posterPath: each.poster_path,
        //   releaseDate: each.release_date,
        //   title: each.title,
        //   video: each.video,
        //   voteAverage: each.vote_average,
        //   voteCount: each.vote_count,
        // }))
        // setData(updatedData)
        setData(responseData.results)
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [searchVal])

  const onClickMovieDetails = id => history.push(`/${id}`)

  const renderMovies = () => (
    <ul className="list-container">
      {data.map(each => (
        <MovieItem
          key={each.id}
          details={each}
          onClickMovieDetails={onClickMovieDetails}
        />
      ))}
    </ul>
  )
  const remderEmptyView = () => (
    <div className="empty-container">
      <h1>!!! Theres nothing available related to your search.</h1>
      <p>Try search something else</p>
    </div>
  )

  const renderSuccessView = () => (
    <div className="home-container">
      {data.length > 0 ? renderMovies() : remderEmptyView()}
    </div>
  )

  return isLoading ? <LoadingView /> : renderSuccessView()
}

export default SearchResults
