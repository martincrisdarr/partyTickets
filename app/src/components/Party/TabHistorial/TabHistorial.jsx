import { Collapse } from 'antd';

const TabHistorial = ({ ticket }) => {
  const collapseChildren = () => {
    return (
      <div className="flex gap-x-6 gap-y-2 flex-wrap">
        <p>Cantidad: {ticket.quantity}</p>
        <p>Fecha: {ticket.date}</p>
        {ticket.type === 'RECEIVE' ? (
          <>
            <p className="flex items-center text-red-400">Vendedor: {ticket.seller.name}</p>
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

  return (
    <Collapse
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
                label: `Vendedor: ${ticket.seller.name}, Tipo: ${
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
  );
};

export default TabHistorial;
