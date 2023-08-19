import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addParty, getAllPartys, getOneParty } from '../../../redux/features/partysSlice';
import { toast } from 'react-toastify';

const ModalCreateParty = ({ isModalVisible, setIsModalVisible, partyId, setPartyId }) => {
  const [formInstance] = Form.useForm();
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();

  const party = useSelector(state => state.partys.party)
  
  useEffect(() => {
    if (partyId) {
      dispatch(getOneParty(partyId));
    }
   
    return () => {
      isModalVisible && setPartyId(null);
      formInstance.resetFields();
    };
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  

  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      if (!partyId) {
        const name = formInstance.getFieldValue('name');
        dispatch(addParty({ title: name, date }));
        dispatch(getAllPartys());
        toast.success('Fiesta creada con éxito');
      }
      setIsModalVisible(false);
    } catch (e) {
      console.log(e);
      toast.error('No se pudo crear la fiesta');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  return (
    <>
      <Button type="primary" className="absolute right-4 bg-blue-500 mt-4" onClick={showModal}>
        Crear Fiesta
      </Button>
      <Modal
        title={!partyId ? 'Crear fiesta' : 'Editar fiesta'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ ghost: true }}
        cancelButtonProps={{ danger: true }}>
        <Form form={formInstance}>
          <Form.Item
            name="name"
            label="Nombre"
            initialValue={partyId ? party?.title : ''}
            rules={[
              {
                required: true,
                message: 'Nombre es requerido',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Fecha"
            rules={[
              {
                required: true,
                message: 'Fecha es requerida',
              },
            ]}>
            <DatePicker onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateParty;
