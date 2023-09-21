import { Badge, Card, Space } from 'antd';
import { useEffect, useState } from 'react';

const SellerTickets = ({ ticketsFlow }) => {
  const [availableTickets, setAvailableTickets] = useState(0);
  const [givenTickets, setGivenTickets] = useState(0);
  const [receivedTickets, setReceivedTickets] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [moneyReceived, setMoneyReceived] = useState(0);
  const [moneyLeft, setMoneyLeft] = useState(0);
  useEffect(() => {
    if (ticketsFlow) {
      setTotalMoney(0);
      setMoneyReceived(0);
      setMoneyLeft(0);
      let available = 0;
      let giv = 0;
      let rec = 0;
      ticketsFlow?.map((ticket) => {
        ticket.type === 'GIVE'
          ? ((available = available + +ticket.quantity), (giv = giv + ticket.quantity))
          : ((available = available - +ticket.quantity), (rec = rec + +ticket.quantity));
      });
      setGivenTickets(giv);
      setReceivedTickets(rec);
      setAvailableTickets(available);
      for (let tick of ticketsFlow) {
        if (tick.type === 'GIVE') {
          setTotalMoney((total) => total + tick.ticket.price * tick.quantity);
        }
        if (tick.type === 'RECEIVE') {
          setMoneyReceived((total) => total + +tick.moneyReceived);
        }
      }
      setMoneyLeft(totalMoney - moneyReceived);
    }
  }, [ticketsFlow]);
  useEffect(() => {
    setMoneyLeft(totalMoney - moneyReceived);
  }, [totalMoney]);
  return (
    <div className="w-full shadow-md rounded-lg">
      <Space direction="vertical" className="w-full">
        <Card title="Tickets">
          <p className="text-lg font-semibold flex items-center gap-2">
            {' '}
            <Badge status="warning" />
            Disponibles: {availableTickets}
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            {' '}
            <Badge status="error" />
            Entregados: {givenTickets}
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            {' '}
            <Badge status="success" />
            Recibidos: {receivedTickets}
          </p>
        </Card>
        <Card title="Dinero">
          <p className="text-lg font-semibold flex items-center gap-2">
            Total entradas: ${totalMoney}
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">Entrego: ${moneyReceived}</p>
          <p className="text-lg font-semibold flex items-center gap-2">
            Falta entregar: ${moneyLeft}
          </p>
        </Card>
      </Space>
    </div>
  );
};

export default SellerTickets;
