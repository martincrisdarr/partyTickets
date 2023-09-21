import {
  BookOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Drawer, Dropdown, Form, Input, Layout, Modal, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/features/authSlice';
import { addParty, getAllPartys } from '../redux/features/partysSlice';
import CollapsedPartys from './CollapsedPartys';
const { Header } = Layout;

const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedPartys, setCollapsedPartys] = useState(false);
  const [modalCreateParty, setModalCreateParty] = useState(false);
  const [formInstance] = Form.useForm();
  const [createParty, setCreateParty] = useState({ title: '', date: '' });
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
    window.location.reload();
  };
  const { partys } = useSelector((state) => state.partys);
  useEffect(() => {
    dispatch(getAllPartys());
  }, []);
  const items = [
    {
      key: '1',
      label: <Link onClick={logoutButton}>Cerrar sesión</Link>,
    },
  ];

  const handleCreateParty = () => {
    setModalCreateParty(true);
    setCollapsed(false);
  };

  const handleOk = async () => {
    await formInstance.validateFields();
    dispatch(addParty(createParty));
    setModalCreateParty(false);
    dispatch(getAllPartys());
  };
  const handleCancel = () => {
    setModalCreateParty(false);
    formInstance.resetFields();
  };

  const handleChangeDate = (date) => {
    const newDate = moment(date).format('DD-MM-YYYY');
    setCreateParty((party) => ({ ...party, date: newDate }));
  };
  const handleChangeName = (e) => {
    setCreateParty((party) => ({ ...party, title: e }));
  };
  return (
    <Layout className="absolute bg-[#FEF8F7] w-screen relative">
      <Drawer
        style={{
          backgroundColor: '#001120',
          color: 'white',
          width: '200px',
          boxShadow: 'none',
          fontSize: 20,
          paddingTop: 150,
        }}
        placement="left"
        onClose={() => setCollapsed(false)}
        open={collapsed}>
        <Button
          className="absolute top-16 w-40 text-white font-semibold border-blue-400 hover:text-blue-400"
          onClick={handleCreateParty}>
          Crear fiesta
        </Button>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 my-6 border-b pb-2 border-blue-400">
          <PieChartOutlined />
          Dashboard
        </Link>
        <div>
          <div
            className="flex items-center gap-2 my-6 border-b pb-2 border-blue-400 relative"
            onClick={() => setCollapsedPartys((coll) => !coll)}>
            <BookOutlined />
            Fiestas
            {partys?.length ? (
              !collapsedPartys ? (
                <DownOutlined style={{ fontSize: 14, position: 'absolute', right: 0 }} />
              ) : (
                <UpOutlined style={{ fontSize: 14, position: 'absolute', right: 0 }} />
              )
            ) : null}
          </div>
          {collapsedPartys && partys?.length ? (
            <CollapsedPartys partys={partys} setCollapsed={setCollapsed} />
          ) : null}
        </div>
        <Link to="/sellers" className="flex items-center gap-2 my-6 border-b pb-2 border-blue-400">
          <TeamOutlined />
          Vendedores
        </Link>
      </Drawer>

      <Layout>
        <Header className="w-full fixed flex items-center left-0 z-50 p-0 bg-[#001529]">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={`absolute  z-50 text-white ${!collapsed ? 'left-42' : 'left-0'}`}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white',
            }}
          />
          <Space direction="vertical" className="absolute right-6 ">
            <Space wrap>
              <Dropdown menu={{ items }} placement="topRight">
                <UserOutlined className="text-white text-xl" />
              </Dropdown>
            </Space>
          </Space>
        </Header>
      </Layout>
      {children}
      <Modal
        title={`Crear fiesta`}
        open={modalCreateParty}
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
            <Input
              placeholder="Ingrese un nombre"
              onChange={(e) => handleChangeName(e.target.value)}
            />
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
            <DatePicker
              placeholder="Ingrese una fecha"
              className="w-48"
              onChange={handleChangeDate}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default LayoutPage;
