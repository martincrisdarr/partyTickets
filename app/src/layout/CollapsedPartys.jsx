import { TagOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const CollapsedPartys = ({ partys, setCollapsed }) => {
  return (
    <div className="flex flex-col gap-4">
      {partys?.map((party) => (
        <Link
          onClick={() => setCollapsed(false)}
          key={party._id}
          to={`/party/${party._id}`}
          className="bg-gray-800 px-2 py-1 text-[17px] rounded-md w-full flex gap-2 items-center">
          <TagOutlined className="text-[15px]" />
          {party.title}
        </Link>
      ))}
    </div>
  );
};

export default CollapsedPartys;
