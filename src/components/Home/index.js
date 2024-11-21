import './index.css'
import {useEffect, useState} from 'react'

import LoadingView from '../LoadingView'
import MovieItem from '../MovieItem'

const Home = props => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {history} = props
  const {location} = history
  const {pathname} = location
  const path = pathname === '/' ? '/popular' : pathname
  console.log(path)

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '6c1eae73214f2615e9c9a48995b1afbf'
      const url = `https://api.themoviedb.org/3/movie${path}?api_key=${apiKey}&language=en-US&page=1`
      const response = await fetch(url)
      if (response.ok) {
        const responseData = await response.json()

        setData(responseData.results)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [path])

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
export default Home
