import PartysCard from './PartysCard';

const PartyCards = ({ partys, loading, setOpenCreatePartyModal, setPartyId }) => {
  return (
    <div className="z-10 flex flex-col justify-center items-center gap-8 ">
      {partys?.map((party) => (
        <PartysCard key={party._id} party={party} setOpenCreatePartyModal={setOpenCreatePartyModal} loading={loading} setPartyId={setPartyId} />
      ))}
    </div>
  );
};

export default PartyCards;
