import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Modal, Skeleton } from 'antd';
import { getAllPartys, removeParty } from '../../../redux/features/partysSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PartysCard = ({ party, loading, setOpenCreatePartyModal, setPartyId }) => {
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();

  const onEdit = (id) => {
    setOpenCreatePartyModal(true), setPartyId(id);
  };

  const deletePartyModal = () => {
    modal.confirm({
      title: 'Eliminar fiesta',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea eliminar la fiesta?',
      okText: 'Eliminar',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(removeParty(party._id));
        dispatch(getAllPartys());
        toast.success('Fiesta eliminada con éxito');
      },
      cancelText: 'Cancelar',
    });
  };

  return (
    <>
      <Card
        className="w-[350px] shadow-md relative"
        bodyStyle={{ padding: 15 }}
        actions={[
          <EditOutlined key="edit" onClick={() => onEdit(party._id)} />,
          <DeleteOutlined key="delete" onClick={deletePartyModal} />,
        ]}>
        <Skeleton loading={loading} avatar active>
          <div className="flex items-center">
            <Link to={`/party/${party._id}`} className="text-xl font-bold">
              {party.title}
            </Link>
            <p className="text-slate-400 absolute right-4"> {party.date.slice(0, 10)}</p>
          </div>
        </Skeleton>
      </Card>
      {contextHolder}
    </>
  );
};

export default PartysCard;
