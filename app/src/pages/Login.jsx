import { useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm/LoginForm';
import { useEffect } from 'react';
import { setPageActive } from '../redux/features/commonSlice';
const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageActive('LOGIN'));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <LoginForm />
    </div>
  );
};

export default Login;
