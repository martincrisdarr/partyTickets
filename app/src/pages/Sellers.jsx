import SellersTable from "../components/Sellers/SellersTable/SellersTable";
import LayoutPage from "../layout/LayoutPage";

const Sellers = () => {
  return (
    <>
      <LayoutPage>
        <div className="pt-24 px-8 w-full min-h-screen">
          <SellersTable />
        </div>
      </LayoutPage>
    </>
  );
};

export default Sellers;
