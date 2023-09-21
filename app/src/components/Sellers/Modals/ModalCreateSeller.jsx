import { Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createSellers, getAllSellers } from '../../../redux/features/sellersSlice';

const ModalAddSellers = ({ isModalVisible, setIsModalVisible }) => {
  const [formInstance] = Form.useForm();

  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      const name = formInstance.getFieldValue('name');
      dispatch(createSellers({ name }));
      setIsModalVisible(false);
      formInstance.resetFields();
      dispatch(getAllSellers());
    } catch (e) {
      console.log(e);
      toast.error('No se pudo crear el vendedor');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formInstance.resetFields();
  };

  return (
    <>
      <Modal
        title={'Agregar vendedor'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ ghost: true }}
        cancelButtonProps={{ danger: true }}>
        <Form form={formInstance}>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: 'Nombre es requerido',
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSellers;
