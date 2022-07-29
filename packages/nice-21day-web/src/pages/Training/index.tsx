import { PRO_TABLE_DEFAULT_CONFIG } from '@/constants';
import { queryTrainings } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  EState,
  ETrainingProgress,
  ETrainingType,
  ITraining,
} from '@nice-21day/shared';
import { Button, Space } from 'antd';
import { useRef } from 'react';

const Training: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ITraining>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      valueEnum: {
        [ETrainingType['21Day']]: {
          text: '21天训练营',
        },
        [ETrainingType.English]: {
          text: '英语打卡',
        },
        [ETrainingType.Sports]: {
          text: '运动打卡',
        },
      },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      valueEnum: {
        [ETrainingProgress.Registering]: {
          text: '报名中',
        },
        [ETrainingProgress.Processing]: {
          text: '打卡中',
        },
        [ETrainingProgress.Finished]: {
          text: '已结束',
        },
      },
    },
    {
      title: '期数',
      key: 'period',
      dataIndex: 'period',
      search: false,
    },
    {
      title: '起止时间',
      key: 'time',
      dataIndex: 'time-range',
      search: false,
      renderText: (_, record) => (
        <>
          <div>{record.start_time}</div>
          <div>{record.end_time}</div>
        </>
      ),
    },
    {
      title: '是否需要押金',
      key: 'fee',
      dataIndex: 'fee',
      search: false,
      renderText: (fee) => (fee ? `${fee}￥` : '无需押金'),
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueEnum: {
        [EState.Enable]: {
          text: '启用',
          status: 'Success',
        },
        [EState.Disable]: {
          text: '禁用',
          status: 'default',
        },
      },
    },
    {
      title: '备注信息',
      key: 'description',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      search: false,
      align: 'center',
      render: () => (
        <Space size="middle">
          <a>启用</a>
          <a>禁用</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<ITraining>
      rowKey="id"
      headerTitle="训练营列表"
      columns={columns}
      actionRef={actionRef}
      {...PRO_TABLE_DEFAULT_CONFIG}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryTrainings({
          ...rest,
          size: pageSize!,
          page: current!,
        });
        return {
          data: res?.rows,
          total: res?.total,
          success: true,
        };
      }}
      scroll={{ x: 1000 }}
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
export default Training;
