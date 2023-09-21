import { LeftCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cleanTicketsFlow } from '../../redux/features/ticketsFlowSlice';

const GoBackButton = ({ endpoint }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(cleanTicketsFlow());
  };
  return (
    <Link
      to={endpoint}
      onClick={handleClick}
      className="flex items-center justify-center gap-2 mb-6 p-1 border border-gray-500 rounded-md w-24 font-semibold shadow-md ">
      <LeftCircleOutlined />
      Atrás
    </Link>
  );
};

export default GoBackButton;
