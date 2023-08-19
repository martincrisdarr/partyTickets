import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateParty from '../components/Partys/Modals/ModalCreateParty';
import PartyCards from '../components/Partys/PartysCards/PartyCards';
import LayoutPage from '../layout/LayoutPage';
import { getAllPartys } from '../redux/features/partysSlice';
import { Empty } from 'antd';

const Partys = () => {
  const dispatch = useDispatch();
  const { partys, isFetching } = useSelector((state) => state.partys);
  const [openCreatePartyModal, setOpenCreatePartyModal] = useState(false);
  const [partyId, setPartyId] = useState(null)

  useEffect(() => {
    dispatch(getAllPartys());
  }, []);

  
  return (
    <LayoutPage>
      <div className="pt-20 h-screen w-screen">
        <ModalCreateParty
          isModalVisible={openCreatePartyModal}
          setIsModalVisible={setOpenCreatePartyModal}
          setPartyId={setPartyId}
          partyId={partyId}
        />
        {partys?.length > 0 ? (
          <div className="mt-16 ">
            <h1 className="text-lg mb-4 ml-8">Total fiestas: {partys?.length}</h1>
            <PartyCards partys={partys} loading={isFetching} setOpenCreatePartyModal={setOpenCreatePartyModal} setPartyId={setPartyId} />
          </div>
        ) : (
          <Empty
            className="mt-32 h-64 flex items-center justify-center flex-col"
            image={Empty.PRESENTED_IMAGE_DEFAULT}
          />
        )}
      </div>
    </LayoutPage>
  );
};

export default Partys;
