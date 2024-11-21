import './index.css'
import Loader from 'react-loader-spinner'

const LoadingView = () => (
  <div className="products-loader-container">
    <Loader type="ThreeDots" color="white" height="50" width="50" />
  </div>
)

export default LoadingView
