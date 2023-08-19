import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginQuery } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const styles = {
  title:
    'border-b-2 text-lg  mb-5 border-[#d9d9d9] pb-2 text-[#343434] after:block after:absolute after:inset-x-0 after:bottom-[-2px] after:w-16 after:h-0.5 after:bg-blue-300 relative inline-block',
  formContainer:
    'flex flex-col bg-white border-gray-200 border-1 px-16 py-20 gap-y-6 rounded-xl shadow-xl',
  form: 'flex flex-col gap-6 ',
  submitButton: 'w-full bg-blue-500',
  formInput: 'h-10',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const onFinish = async (values) => {
    dispatch(loginQuery(values)).then((action) => {
      action.meta.requestStatus === 'fulfilled' && navigate('/dashboard')
    });
  };
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Ingresar</h1>
      <Form name="login" onFinish={onFinish} className={styles.form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Usuario es requerido',
            },
          ]}>
          <Input placeholder="Usuario" className={styles.formInput} />
        </Form.Item>

        <Form.Item
          name="password"
          label=""
          rules={[
            {
              required: true,
              message: 'Contraseña es requerida',
            },
          ]}>
          <Input.Password placeholder="Contraseña" className={styles.formInput} />
        </Form.Item>

        <Form.Item className="w-full">
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            {isLoading ? <LoadingOutlined color="#36d7b7" /> : 'Enviar'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
