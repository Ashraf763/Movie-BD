import './index.css'

import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const [search, setSearch] = useState('')
  const {history} = props
  const {location} = history
  const {pathname} = location

  const onCLickSearch = e => {
    e.preventDefault()
    history.push(`/search?${search}`)
  }

  const onCLickPopular = () => {
    history.push('/')
  }

  const onCLickTopRated = () => {
    history.push('/top_rated')
  }

  const onCLlickUpcoming = () => {
    history.push('/upcoming')
  }

  return (
    <div className="header-container">
      <div className="header-top">
        <Link to="/" className="link">
          <h1 className="header-title">MovieDB</h1>
        </Link>
        <form className="search-container" onSubmit={onCLickSearch}>
          <input
            type="text"
            className="input"
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      <div>
        <button
          type="button"
          className={`header-btn ${pathname === '/' && 'active'}`}
          onClick={onCLickPopular}
        >
          Popular
        </button>
        <button
          type="button"
          className={`header-btn ${pathname === '/top_rated' && 'active'}`}
          onClick={onCLickTopRated}
        >
          Top Rated
        </button>
        <button
          type="button"
          className={`header-btn ${pathname === '/upcoming' && 'active'}`}
          onClick={onCLlickUpcoming}
        >
          Upcoming
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
