import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsFlowByEvent } from '../../../redux/features/ticketsFlowSlice';
import TabHistorial from '../TabHistorial/TabHistorial';

const TabItem = ({ tab }) => {
  const { party } = useSelector((state) => state.partys);
  const { ticketsFlow } = useSelector((state) => state.ticketsFlow);

  const dispatch = useDispatch();
  useEffect(() => {
    if (party._id) {
      dispatch(getTicketsFlowByEvent(party?._id));
    }
  }, [party]);

  const renderTab = () => {
    if (tab === 'given') {
      const tickets = ticketsFlow?.filter((ticket) => ticket.type === 'GIVE');
      return (
        <div className="flex flex-col gap-4 mt-2">
          {tickets.map((ticket) => (
            <TabHistorial key={ticket._id} ticket={ticket} />
          ))}
        </div>
      );
    }
    if (tab === 'received') {
      const tickets = ticketsFlow?.filter((ticket) => ticket.type === 'RECEIVE');
      return (
        <div className="flex flex-col gap-4 mt-2">
          {tickets.map((ticket) => (
            <TabHistorial key={ticket._id} ticket={ticket} />
          ))}
        </div>
      );
    }
    return (
      <div>
        {party?.tickets?.map(
          (par) =>
            par.quantity > 0 && (
              <span
                key={par._id}
                className="flex flex-col p-2 w-full justify-between items-center border-b my-2 border-blue-300 font-semibold text-lg">
                <p>Tipo: {par.step ? par.type + ' ' + par.step : par.type}</p>
                <p>Cantidad: {par.quantity}</p>
                <p className="text-green-500">Precio: ${par.price}</p>
              </span>
            )
        )}
      </div>
    );
  };

  return renderTab();
};

export default TabItem;
