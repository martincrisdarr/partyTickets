import {
  FlagOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/features/authSlice';

const { Header } = Layout;

const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
    window.location.reload();
  };
  const items = [
    {
      key: '1',
      label: <Link onClick={logoutButton}>Cerrar sesión</Link>,
    },
  ];

  return (
    <Layout className="absolute bg-[#FEF8F7] w-screen relative">
      <div
        className={`absolute ${
          collapsed ? 'top-16' : '-top-[1500px]'
        } z-40 transition-all duration-300`}>
        <Menu
          theme="dark"
          mode="inline"
          className="rounded-br-lg "
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <PieChartOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
              onClick: () => setCollapsed(false),
            },
            {
              key: '2',
              icon: <FlagOutlined />,
              label: <Link to="/partys">Fiestas</Link>,
              onClick: () => setCollapsed(false),
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: <Link to="/sellers">Vendedores</Link>,
              onClick: () => setCollapsed(false),
            },
          ]}
        />
      </div>
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
    </Layout>
  );
};

export default LayoutPage;
