import { useParams } from 'react-router-dom';
import LayoutPage from '../layout/LayoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSeller } from '../redux/features/sellersSlice';
import { useEffect } from 'react';

const Seller = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const {seller} = useSelector(state => state.sellers)

  useEffect(() => {
    dispatch(getOneSeller(id))
  },[id])

  return (
    <LayoutPage>
      <div className="pt-24 px-8 w-full min-h-screen">
        {seller.name}
      </div>
    </LayoutPage>
  );
};

export default Seller;
