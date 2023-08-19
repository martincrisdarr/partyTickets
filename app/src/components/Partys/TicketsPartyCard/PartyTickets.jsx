import { Button, Card } from 'antd';
import { useState } from 'react';
import ModalAddTickets from '../Modals/ModalAddTickets';
import TicketsTable from './TicketsTable/TicketsTable';

const TicketsPartyCard = ({ tickets }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTabKey1, setActiveTabKey1] = useState('available');
  const tabList = [
    {
      key: 'available',
      tab: 'Disponibles',
    },
    {
      key: 'received',
      tab: 'Recibidos',
    },
    {
      key: 'given',
      tab: 'Entregados',
    },
  ];

  const dataTableColumns = () => {
    if (activeTabKey1 === 'available') {
      return [
        { title: 'Tipo', dataIndex: 'tipo' },
        { title: 'Cantidad', dataIndex: 'cantidad' },
      ];
    }
  };
  const dataSourceTable = () => {
    if (activeTabKey1 === 'available') {
      return tickets?.map((ticket) => {
        return {
          key: ticket._id,
          tipo: ticket.step ? ticket.type + ticket.step : ticket.type,
          cantidad: ticket.quantity,
        };
      });
    }
  };

  const contentList = {
    given: <p>content1</p>,
    received: <p>content2</p>,
    available: <TicketsTable dataSource={dataSourceTable()} columns={dataTableColumns()} />,
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop: 50,
          position: 'relative',
          paddingTop: 40,
        }}
        size="lg"
        extra={
          <Button onClick={() => setIsModalVisible(true)} className="absolute top-4 right-6">
            Agregar
          </Button>
        }
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}>
        <p className="absolute top-4 text-lg font-bold text-blue-400">TICKETS</p>
        {contentList[activeTabKey1]}
      </Card>
      <ModalAddTickets isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default TicketsPartyCard;
