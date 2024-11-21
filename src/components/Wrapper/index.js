import {Route, Switch} from 'react-router-dom'

import Home from '../Home'
import MovieDetails from '../MovieDetails'
import SearchResults from '../SearchResults'

const Wrapper = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top_rated" component={Home} />
    <Route exact path="/upcoming" component={Home} />
    <Route exact path="/search" component={SearchResults} />
    <Route exact path="/:id" component={MovieDetails} />
  </Switch>
)

export default Wrapper
