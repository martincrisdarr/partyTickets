import { Table } from 'antd';

const TicketsTable = ({ columns, dataSource }) => {
  return (
    <>
      <Table  columns={columns} pagination={false} dataSource={dataSource} size="middle" />
    </>
  );
};

export default TicketsTable;
