import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PartyTickets from '../components/Partys/TicketsPartyCard/PartyTickets';
import LayoutPage from '../layout/LayoutPage';
import { getOneParty } from '../redux/features/partysSlice';

const Party = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const party = useSelector((state) => state.partys.party);
  useEffect(() => {
    dispatch(getOneParty(id));
  }, [id]);

  return (
    <>
      <LayoutPage>
        <div className="pt-24 px-8 w-full min-h-screen">
          <h1 className="text-5xl text-center">{party.title}</h1>
          <PartyTickets tickets={party?.tickets} />
        </div>
      </LayoutPage>
    </>
  );
};

export default Party;
