import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <ToastContainer
        theme="colored"
        autoClose={3000}
        position='bottom-center'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
)
