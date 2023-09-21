import { BookFilled, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllSellers, removeSeller } from '../../../redux/features/sellersSlice';
import ModalAssignTicket from '../Modals/ModalAssignTickets';
import ModalAddSellers from '../Modals/ModalCreateSeller';

const SellersTable = () => {
  const [modalCreateSeller, setModalCreateSeller] = useState(false);
  const [modalAssignTickets, setModalAssignTickets] = useState(false);
  const [assignSeller, setAssignSeller] = useState(null);
  const [modal, contextHolder] = Modal.useModal();

  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(getAllSellers());
  }, []);

  const deleteSeller = (id) => {
    modal.confirm({
      title: 'Eliminar vendedor',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea eliminar el vendedor?',
      okText: 'Eliminar',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(removeSeller(id));
        toast.success('Vendedor eliminado con éxito');
        dispatch(getAllSellers());
      },
      cancelText: 'Cancelar',
    });
  };

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
      render: (_, record) => [
        <div key="1" className="flex gap-6 justify-center">
          <div
            className="flex items-center gap-1 p-2 bg-blue-400 border shadow-md rounded-xl text-white font-semibold cursor-pointer"
            onClick={() => (setModalAssignTickets(true), setAssignSeller(record.key.seller))}>
            <BookFilled />
            Tickets
          </div>
          <div
            className="flex items-center gap-1 p-2 bg-red-400 border shadow-md rounded-xl text-white font-semibold cursor-pointer"
            onClick={() => deleteSeller(record.key.seller._id)}>
            <DeleteOutlined />
            Eliminar
          </div>
        </div>,
      ],
    },
  ];
  const data = sellers?.map((seller) => ({
    key: { seller },
    name: (
      <Link to={`/sellers/${seller._id}`} className="font-semibold text-gray-500 underline ">
        {seller.name}
      </Link>
    ),
  }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="shadow-md "
        bordered
        title={() => 'Vendedores'}
        footer={() => `Total vendedores: ${sellers?.length}`}></Table>
      <Button className="absolute top-[108px] right-12" onClick={() => setModalCreateSeller(true)}>
        Agregar
      </Button>
      <ModalAddSellers
        isModalVisible={modalCreateSeller}
        setIsModalVisible={setModalCreateSeller}
      />
      <ModalAssignTicket
        isModalVisible={modalAssignTickets}
        setIsModalVisible={setModalAssignTickets}
        seller={assignSeller}
      />
      {contextHolder}
    </>
  );
};
export default SellersTable;
