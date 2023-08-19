import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Party from './pages/Party';
import Partys from './pages/Partys';
import Sellers from './pages/Sellers';
import { logout } from './redux/features/authSlice';
import Seller from './pages/Seller';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const userToken = localStorage.getItem('AUTH_TICKETS_TOKEN');
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401 || err.response.data.message === '401 Unauthorized') {
        dispatch(logout());
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  );
  
  
  const routes = createBrowserRouter([
    {
      path: '/',
      element: token ? <Navigate to='/dashboard' /> : <Login />,
    },
    {
      path: '/dashboard',
      element: token ? <Dashboard /> : <Navigate to='/' />,
    },
    {
      path: '/partys',
      element: token ? <Partys /> : <Navigate to="/" />,
    },
    {
      path: '/party/:id',
      element: token ? <Party /> : <Navigate to="/" />,
    },
    {
      path: '/sellers',
      element: token ? <Sellers /> : <Navigate to="/" />,
    },
    {
      path: '/sellers/:id',
      element: token ? <Seller /> : <Navigate to="/" />,
    },
  ]);

  return (
    <div className="bg-[#FEF8F7]">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
