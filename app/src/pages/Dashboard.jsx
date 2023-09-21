import { Link } from 'react-router-dom';
import LayoutPage from '../layout/LayoutPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageActive } from '../redux/features/commonSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageActive('DASHBOARD'));
  }, []);
  return (
    <LayoutPage>
      <div className="mt- 64">
        Dashboard
        <Link to="/partys">Partys</Link>
      </div>
    </LayoutPage>
  );
};

export default Dashboard;
