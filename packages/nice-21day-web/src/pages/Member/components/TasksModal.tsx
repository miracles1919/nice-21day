import { ITrainingTask } from '@nice-21day/shared';
import { Button, Modal, Table } from 'antd';
import React from 'react';

interface IProps {
  visible: boolean;
  tasks: ITrainingTask[];
  handleOk: () => void;
}

const TasksModal: React.FC<IProps> = (props) => {
  const { visible, handleOk, tasks } = props;

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '任务描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <Modal
      title="任务详情"
      visible={visible}
      onCancel={handleOk}
      footer={
        <>
          <Button type="primary" onClick={handleOk}>
            我知道了
          </Button>
        </>
      }
    >
      <Table
        bordered
        size="small"
        dataSource={tasks}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default TasksModal;
