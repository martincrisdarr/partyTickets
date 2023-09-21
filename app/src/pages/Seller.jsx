import { BookFilled } from '@ant-design/icons';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton/GoBackButton';
import ModalAssignTicket from '../components/Sellers/Modals/ModalAssignTickets';
import SellerHistorial from '../components/Sellers/Seller/SellerHistorial/SellerHistorial';
import SellerTickets from '../components/Sellers/Seller/SellerTickets/SellerTickets';
import LayoutPage from '../layout/LayoutPage';
import { getAllPartys } from '../redux/features/partysSlice';
import { getOneSeller } from '../redux/features/sellersSlice';
import {
  getTicketsFlowBySeller,
  getTicketsFlowBySellerType,
} from '../redux/features/ticketsFlowSlice';

const Seller = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellers);
  const { partys } = useSelector((state) => state.partys);
  const { ticketsFlow, ticketsFlowSellerType } = useSelector((state) => state.ticketsFlow);
  const [partySelected, setPartySelected] = useState(null);
  const [ticketSelected, setTicketSelected] = useState({ type: '', step: '' });
  const [modalAssignTickets, setModalAssignTickets] = useState(false);
  const [assignSeller, setAssignSeller] = useState(null);

  useEffect(() => {
    dispatch(getOneSeller(id));
    dispatch(getAllPartys());
  }, [id]);

  useEffect(() => {
    if (partySelected) {
      if (ticketSelected.type !== '') {
        dispatch(getTicketsFlowBySellerType({ _id: id, event: partySelected, ...ticketSelected }));
      } else {
        dispatch(getTicketsFlowBySeller({ _id: id, event: partySelected }));
      }
    }
  }, [partySelected, ticketSelected]);

  const onChangeParty = (value) => {
    setPartySelected(value);
  };
  const selectPartyOptions = partys?.map((party) => ({ value: party._id, label: party.title }));
  const selectSellsOptions = ticketsFlow?.map((ticket) => ({
    value: `${ticket.ticket.type + ' ' + ticket.ticket.step}`,
  }));

  const onChangeTicket = (value) => {
    const type = value.split(' ')[0];
    const step = value.split(' ')[1];
    setTicketSelected({ type, step });
  };
  let resultOptions = [];
  for (let option of selectSellsOptions) {
    const findOne = resultOptions.find((res) => res.value === option.value);
    if (!findOne) {
      resultOptions = [...resultOptions, option];
    }
  }

  return (
    <LayoutPage>
      <div className="py-24 px-8 w-full min-h-screen gap-6 flex flex-col">
        <GoBackButton endpoint="/sellers" />
        <div key="1" className="flex gap-6 justify-center absolute right-6 -mt-1 ">
          <div
            className="flex items-center justify-center w-24 gap-1 p-2 bg-blue-400 border shadow-md rounded-xl text-white font-semibold cursor-pointer"
            onClick={() => (setModalAssignTickets(true), setAssignSeller(seller))}>
            <BookFilled />
            Tickets
          </div>
        </div>
        <h1 className="text-4xl text-center">{seller.name}</h1>
        <Select
          placeholder="Seleccione una fiesta..."
          onChange={onChangeParty}
          options={selectPartyOptions}
        />
        <Select
          placeholder="Seleccione un tipo de venta..."
          options={resultOptions}
          onChange={onChangeTicket}
        />
        {partySelected ? (
          <>
            <SellerTickets
              ticketsFlow={ticketsFlowSellerType.length ? ticketsFlowSellerType : ticketsFlow}
            />
            <SellerHistorial
              ticketsFlow={ticketsFlowSellerType.length ? ticketsFlowSellerType : ticketsFlow}
            />{' '}
          </>
        ) : null}
      </div>
      <ModalAssignTicket
        isModalVisible={modalAssignTickets}
        setIsModalVisible={setModalAssignTickets}
        seller={assignSeller}
      />
    </LayoutPage>
  );
};

export default Seller;
