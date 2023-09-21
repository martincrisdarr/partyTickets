import { Button, Card, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TabItem from '../components/Party/TabItem/TabItem';
import LayoutPage from '../layout/LayoutPage';
import { getOneParty } from '../redux/features/partysSlice';
import ModalCreateTickets from '../components/Party/Modal/ModalCreateTickets';
import { getTicketsFlowByEvent } from '../redux/features/ticketsFlowSlice';

const Party = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const party = useSelector((state) => state.partys.party);
  const [tab, setTab] = useState('available');
  const [createTickets, setCreateTickets] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const { ticketsFlow } = useSelector((state) => state.ticketsFlow);
  useEffect(() => {
    setTotalMoney(0);
    if (id) {
      dispatch(getOneParty(id));
      dispatch(getTicketsFlowByEvent(id));
    }
  }, [id]);

  useEffect(() => {
    setTotalMoney(0);
    for (let ticket of ticketsFlow) {
      if (ticket.type === 'RECEIVE') {
        setTotalMoney((total) => total + +ticket.moneyReceived);
      }
    }
  }, [ticketsFlow]);

  const onChange = (key) => {
    setTab(key);
  };
  const items = [
    {
      key: 'available',
      label: 'Disponibles',
      children: <TabItem tab={tab} />,
    },
    {
      key: 'given',
      label: 'Entregados',
      children: <TabItem tab={tab} />,
    },
    {
      key: 'received',
      label: 'Recibidos',
      children: <TabItem tab={tab} />,
    },
  ];

  return (
    <>
      <LayoutPage>
        <div className="pt-24 px-8 w-full min-h-screen">
          <h1 className="text-5xl text-center mb-12">{party.title}</h1>

          <Card title="Dinero" className="mt-6">
            <p className="text-lg font-semibold flex items-center gap-2">
              Total Dinero: ${totalMoney}
            </p>
          </Card>
          <div className="mt-20 bg-white p-6 border shadow-md rounded-lg min-h-[300px] relative">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Tickets</h3>
            <Button className="absolute right-4 top-6" onClick={() => setCreateTickets(true)}>
              Agregar
            </Button>
            <ModalCreateTickets
              isModalVisible={createTickets}
              setIsModalVisible={setCreateTickets}
              party={party}
            />
            <Tabs defaultActiveKey="available" items={items} onChange={onChange} />
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default Party;
