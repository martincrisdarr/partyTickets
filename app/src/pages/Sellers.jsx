import { useDispatch } from 'react-redux';
import SellersTable from '../components/Sellers/SellersTable/SellersTable';
import LayoutPage from '../layout/LayoutPage';
import { useEffect } from 'react';
import { setPageActive } from '../redux/features/commonSlice';
const Sellers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageActive('SELLERS'));
  }, []);
  return (
    <>
      <LayoutPage>
        <div className="pt-24 px-8 w-full min-h-screen">
          <SellersTable />
        </div>
      </LayoutPage>
    </>
  );
};

export default Sellers;
