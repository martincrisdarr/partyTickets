import { Form, Input, Modal, Select } from 'antd';
// import moment from 'moment/moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTickets } from '../../../redux/features/ticketsSlice';
import { getOneParty } from '../../../redux/features/partysSlice';
import { DollarTwoTone } from '@ant-design/icons';

const ModalCreateTickets = ({ isModalVisible, setIsModalVisible, party }) => {
  const [formInstance] = Form.useForm();
  const [ticketCreate, setTicketCreate] = useState({
    step: null,
    quantity: 0,
    event: null,
    type: '',
  });
  const dispatch = useDispatch();
  const handleChangeType = (value) => {
    const type = value.split(' ')[0];
    const step = value.split(' ')[1];
    setTicketCreate({ ...ticketCreate, type, step: step ? step : null });
  };
  const handleChangeQty = (e) => {
    setTicketCreate((ticket) => ({ ...ticket, quantity: e }));
  };
  const typeOptions = [
    {
      value: 'GENERAL 1',
      label: 'GENERAL 1',
    },
    {
      value: 'GENERAL 2',
      label: 'GENERAL 2',
    },
    {
      value: 'GENERAL 3',
      label: 'GENERAL 3',
    },
    {
      value: 'GENERAL 4',
      label: 'GENERAL 4',
    },
    {
      value: 'FREE',
      label: 'FREE',
    },
    {
      value: 'PALCO',
      label: 'PALCO',
    },
    {
      value: 'VIP 1',
      label: 'VIP 1',
    },
    {
      value: 'VIP 2',
      label: 'VIP 2',
    },
  ];

  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      const price = +formInstance.getFieldValue('price');
      dispatch(addTickets({ ...ticketCreate, event: party._id, price }));
      dispatch(getOneParty(party._id));
      setIsModalVisible(false);
      formInstance.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formInstance.resetFields();
    setTicketCreate({
      step: null,
      quantity: 0,
      event: null,
      type: '',
    });
  };
  return (
    <>
      <Modal
        title={`Agregar Tickets a ${party?.title}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ ghost: true }}
        cancelButtonProps={{ danger: true }}>
        <Form form={formInstance}>
          <Form.Item
            name="quantity"
            label="Cantidad"
            rules={[
              {
                required: true,
                message: 'Cantidad es requerida',
              },
            ]}>
            <Input type="number" onChange={(e) => handleChangeQty(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Tipo"
            rules={[
              {
                required: true,
                message: 'Tipo es requerido',
              },
            ]}>
            <Select
              defaultValue=""
              style={{
                width: 120,
              }}
              onChange={handleChangeType}
              options={typeOptions}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Precio"
            rules={[
              {
                required: true,
                message: 'Precio es requerido',
              },
            ]}>
            <Input type="number" prefix={<DollarTwoTone />} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateTickets;
