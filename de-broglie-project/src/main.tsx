import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename="/De_Broglie_Calculation_RIP_2025_frontend">
      <App />
    </BrowserRouter>
  </Provider>,
)

if ("serviceWorker" in navigator) {
  registerSW()
}
