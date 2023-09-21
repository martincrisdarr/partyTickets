import { Collapse, Empty, Tabs } from 'antd';
import { useEffect, useState } from 'react';

const SellerHistorial = ({ ticketsFlow }) => {
  const [ticketsDisplay, setTicketsDisplay] = useState(null);

  useEffect(() => {
    setTicketsDisplay(ticketsFlow.filter((tickets) => tickets.type === 'RECEIVE'));
  }, [ticketsFlow]);
  const collapseChildren = (ticket) => {
    return (
      <div className="flex gap-x-6 gap-y-2 flex-wrap">
        <p>Cantidad: {ticket.quantity}</p>
        <p>Fecha: {ticket.date}</p>
        {ticket.type === 'RECEIVE' ? (
          <>
            <p>
              Tipo:{' '}
              {ticket.ticket.step
                ? ticket.ticket.type + ' ' + ticket.ticket.step
                : ticket.ticket.type}
            </p>
            <p className="flex items-center">Método de pago: {ticket.paymentMethod}</p>
            {ticket.paymentMethod === 'MERCADOPAGO' && ticket.methodOperation && (
              <p className="flex items text-blue-500">Operación: #{ticket.methodOperation}</p>
            )}
            <p className="flex items-center text-green-500 text-lg">
              Dinero recibido: ${ticket.moneyReceived}
            </p>
          </>
        ) : null}
      </div>
    );
  };

  const onChange = (key) => {
    setTicketsDisplay(ticketsFlow.filter((tickets) => tickets.type === key));
  };

  const items = [
    {
      key: 'RECEIVE',
      label: 'Recibidos',
    },
    {
      key: 'GIVE',
      label: 'Entregados',
    },
  ];

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-md border shadow-md">
      <h2 className="text-xl">Historial</h2>
      <Tabs defaultActiveKey="Recibidos" items={items} onChange={onChange} />

      {ticketsDisplay?.length ? (
        ticketsDisplay?.map((ticket) => (
          <Collapse
            key={ticket._id}
            size="small"
            className={
              ticket.type === 'RECEIVE'
                ? 'bg-green-200 -mt-2 font-semibold'
                : 'bg-red-200 -mt-2 font-semibold'
            }
            items={
              ticket.type !== 'RECEIVE'
                ? [
                    {
                      key: '1',
                      label: `Fecha: ${ticket.date}, Tipo: ${
                        ticket.ticket.step
                          ? ticket.ticket.type + ' ' + ticket.ticket.step
                          : ticket.ticket.type
                      }   `,
                      children: collapseChildren(ticket),
                    },
                  ]
                : [
                    {
                      key: '1',
                      label: `Pago: ${ticket.paymentMethod.toLowerCase()}, Dinero: $${
                        ticket.moneyReceived
                      }   `,
                      children: collapseChildren(ticket),
                    },
                  ]
            }
          />
        ))
      ) : (
        <Empty className="mt-12" image={Empty.PRESENTED_IMAGE_DEFAULT} />
      )}
    </div>
  );
};

export default SellerHistorial;
