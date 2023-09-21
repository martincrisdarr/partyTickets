import { Form, Input, Modal, Select } from 'antd';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllPartys } from '../../../redux/features/partysSlice';
import { addTicketsFlow } from '../../../redux/features/ticketsFlowSlice';
import { getEventTickets } from '../../../redux/features/ticketsSlice';
import { DollarTwoTone, BarcodeOutlined } from '@ant-design/icons';
import { getOneSeller } from '../../../redux/features/sellersSlice';

const ModalAssignTicket = ({ isModalVisible, setIsModalVisible, seller }) => {
  const [formInstance] = Form.useForm();
  const [ticketsFlow, setTicketsFlow] = useState({
    ticket: null,
    step: null,
    quantity: 0,
    paymentMethod: null,
    moneyReceived: null,
    event: null,
    type: '',
    seller: null,
    date: moment().format('DD-MM HH:mm'),
  });
  const [availableQty, setAvailableQty] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('EFECTIVO');
  const dispatch = useDispatch();
  const { partys } = useSelector((state) => state.partys);
  const { message } = useSelector((state) => state.tickets.tickets);
  const { error } = useSelector((state) => state.ticketsFlow);
  useEffect(() => {
    dispatch(getAllPartys());
    setPaymentMethod('EFECTIVO');
  }, []);

  const handleChangeType = (value) => {
    let [ticketType, step, qty] = value.split(' ');
    step = Number(step);
    setAvailableQty(qty);
    if (value.toLowerCase().includes('general')) {
      return setTicketsFlow((ticket) => ({
        ...ticket,
        ticket: ticketType,
        step: step ? step : null,
      }));
    }

    if (value.toLowerCase().includes('vip')) {
      const [, step] = value.split(' ');
      return setTicketsFlow((ticket) => ({
        ...ticket,
        ticket: ticketType,
        step: step ? step : null,
      }));
    }
    setTicketsFlow((ticket) => ({
      ...ticket,
      ticket: ticketType,
      step: null,
    }));
  };
  const handleChangeParty = (value) => {
    setTicketsFlow((ticket) => ({
      ...ticket,
      event: value,
    }));
    dispatch(getEventTickets(value));
  };
  const handleChangeAction = (value) => {
    setTicketsFlow((ticket) => ({
      ...ticket,
      type: value,
    }));
  };
  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      if (availableQty <= 0 && ticketsFlow.type === 'GIVE')
        return toast.error('No tienes los tickets suficientes');
      dispatch(
        addTicketsFlow({
          ...ticketsFlow,
          quantity: +formInstance.getFieldValue('quantity'),
          paymentMethod: paymentMethod,
          methodOperation: formInstance.getFieldValue('methodOperation'),
          moneyReceived: formInstance.getFieldValue('moneyReceived'),
          seller: seller._id,
        })
      );
      setTicketsFlow((ticket) => ({ ...ticket, type: '' }));
      dispatch(getOneSeller(seller._id));
      formInstance.resetFields();
      setIsModalVisible(false);
      setAvailableQty(null);
      setPaymentMethod('EFECTIVO');
      if (!error) {
        setAvailableQty(null);
        formInstance.resetFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formInstance.resetFields();
    setTicketsFlow({
      ticket: null,
      step: null,
      quantity: 0,
      event: null,
      type: '',
      seller: null,
      date: moment().format('DD-MM HH:mm'),
    });
    setAvailableQty(null);
  };
  const typeSelect = message?.filter((mess) => mess.quantity >= 0);

  const handlePaymentMethod = (value) => {
    setPaymentMethod(value);
  };

  return (
    <>
      <Modal
        title={`Asignar Tickets a ${seller?.name}`}
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
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="party"
            label="Fiesta"
            rules={[
              {
                required: true,
                message: 'Fiesta es requerida',
              },
            ]}>
            <Select
              defaultValue=""
              onChange={handleChangeParty}
              options={partys?.map((party) => ({
                value: party._id,
                label: `${party.title} / ${moment(party.date).format('DD-MM-YYYY')}`,
              }))}
            />
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
              disabled={!ticketsFlow?.event}
              onChange={handleChangeType}
              options={typeSelect?.map((mess) => ({
                value: `${mess.type} ${mess.step ? mess.step : ''} ${mess.quantity}`,
                label: `${mess.type} ${mess.step ? mess.step : ''}`,
              }))}
            />
          </Form.Item>
          <p className="-mt-2">
            {availableQty ? `Tickets disponibles para entrega: ${availableQty}` : null}
          </p>
          <Form.Item
            name="giveRecibe"
            label="Acción"
            rules={[
              {
                required: true,
                message: 'Acción es requerida',
              },
            ]}>
            <Select
              defaultValue=""
              onChange={handleChangeAction}
              options={[
                {
                  value: 'GIVE',
                  label: 'Entrego',
                },
                {
                  value: 'RECEIVE',
                  label: 'Recibo',
                },
              ]}
            />
          </Form.Item>
          {ticketsFlow.type === 'RECEIVE' && (
            <>
              <Form.Item name="paymentMethod" label="Método de pago">
                <Select
                  defaultValue="EFECTIVO"
                  onChange={handlePaymentMethod}
                  options={[
                    {
                      value: 'EFECTIVO',
                      label: 'EFECTIVO',
                    },
                    {
                      value: 'MERCADOPAGO',
                      label: 'MERCADO PAGO',
                    },
                  ]}
                />
              </Form.Item>
              {paymentMethod === 'MERCADOPAGO' && (
                <Form.Item name="methodOperation" label="Numero de operación">
                  <Input prefix={<BarcodeOutlined />} />
                </Form.Item>
              )}
              <Form.Item
                name="moneyReceived"
                label="Dinero recibido"
                rules={[
                  {
                    required: true,
                    message: 'Dinero recibido es requerido',
                  },
                ]}>
                <Input prefix={<DollarTwoTone />} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalAssignTicket;
