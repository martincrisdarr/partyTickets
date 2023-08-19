import { Link } from 'react-router-dom';
import LayoutPage from '../layout/LayoutPage';

const Dashboard = () => {
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
