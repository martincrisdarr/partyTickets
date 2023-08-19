import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import ModalAddSellers from '../Modals/ModalCreateSeller';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers } from '../../../redux/features/sellersSlice';
import { Link } from 'react-router-dom'

const SellersTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(getAllSellers());
  }, []);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: 'Acciones',
      dataIndex: 'given',
      align: 'left',
      render: () => ['hola', 'chau']
    },
  
  ];
  const data = sellers?.map((seller) => ({
    key: 'name',
    name: <Link to={`/sellers/${seller._id}`}>{seller.name}</Link>,
  }));


  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Vendedores'}
        footer={() => `Total vendedores: ${sellers?.length}`}></Table>
      <Button className="absolute top-[108px] right-12" onClick={() => setModalVisible(true)}>
        Agregar
      </Button>
      <ModalAddSellers isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />
    </>
  );
};
export default SellersTable;
