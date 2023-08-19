import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addTickets } from '../../../redux/features/ticketsSlice';
import { getOneParty } from '../../../redux/features/partysSlice';

const ModalAddTickets = ({ isModalVisible, setIsModalVisible }) => {
  const [formInstance] = Form.useForm();
  const { id } = useParams();
  const [tickets, setTickets] = useState({ type: null, step: null, event: id, quantity: 0 });

  const dispatch = useDispatch();
  
  const handleChangeSelect = (value) => {
    if (value.toLowerCase().includes('general')) {
      const [, step] = value.split(' ');
      return setTickets((ticket) => ({
        ...ticket,
        type: 'GENERAL',
        step: step ? step : null,
      }));
    }

    if (value.toLowerCase().includes('vip')) {
      const [, step] = value.split(' ');
       return setTickets((ticket) => ({
        ...ticket,
        type: 'VIP',
        step: step ? step : null,
      }));
    }
    setTickets(ticket => ({
      ...ticket,
      type: value,
      step: null
    }))
  };

  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      const quantity = formInstance.getFieldValue('quantity');
      dispatch(addTickets({...tickets, quantity: quantity}))
      toast.success('Tickets agregados con éxito');
      setIsModalVisible(false);
      formInstance.resetFields()
      dispatch(getOneParty(id))
    } catch (e) {
      console.log(e);
      toast.error('No se pudo agregar tickets');
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    formInstance.resetFields()
  };

  return (
    <>
      <Modal
        title={'Agregar tickets'}
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
            <Input type='number' />
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
              defaultValue=''
              style={{
                width: 120,
              }}
              onChange={handleChangeSelect}
              options={[
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
                  value: 'VIP 1',
                  label: 'VIP 1',
                },
                {
                  value: 'VIP 2',
                  label: 'VIP 2',
                },
                {
                  value: 'FREE',
                  label: 'FREE',
                },
                {
                  value: 'PALCO',
                  label: 'PALCO',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddTickets;
