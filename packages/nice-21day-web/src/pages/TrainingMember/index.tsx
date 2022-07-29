import React, { useRef, useState } from 'react';
// 组件库
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Switch } from 'antd';
// 工具库
import {
  EBooleanString,
  EState,
  ETrainingPaymentState,
  ETrainingProgress,
  ITrainingMember,
  ITrainingTask,
  parseArrayJson,
} from '@nice-21day/shared';
import { useRequest } from '@umijs/max';
// service
import { queryTrainingMembers, updateTrainingMemberState } from '@/services';
// 子组件
import { SelectTraining } from '@/components/SelectTraining';
import { SelectUser } from '@/components/SelectUser';
import { PRO_TABLE_DEFAULT_CONFIG } from '@/constants';
import TasksModal from './components/TasksModal';

const TrainingMember: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksDatasource, setTasksDatasource] = useState<ITrainingTask[]>([]);

  // 启用、禁用
  const { run: updateTrainingMemberStateRun } = useRequest(
    updateTrainingMemberState,
    {
      manual: true,
      onSuccess: () => {
        actionRef?.current?.reload();
      },
    },
  );

  const columns: ProColumns<ITrainingMember>[] = [
    {
      title: '成员',
      dataIndex: 'user_id',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: (_, props) => <SelectUser {...props} />,
    },
    {
      title: '训练营',
      dataIndex: 'training_id',
      valueType: 'select',
      width: 120,
      render: (_, record) => {
        return record.training?.name || record.training_id;
      },
      renderFormItem: (_, props) => <SelectTraining {...props} />,
    },
    {
      title: '训练营进度',
      dataIndex: 'progress',
      width: 120,
      search: false,
      renderText: (_, record) => record.training?.progress,
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
      title: '期望任务',
      dataIndex: 'tasks',
      width: 120,
      search: false,
      ellipsis: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setTasksDatasource(parseArrayJson<ITrainingTask>(record.tasks));
              setModalVisible(true);
            }}
          >
            共 {JSON.parse(record?.tasks)?.length} 个
          </a>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 120,
      search: false,
      render: (state, record) => {
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            checked={state === EState.Enable}
            onChange={(checked: boolean) => {
              const state = checked ? EState.Enable : EState.Disable;
              updateTrainingMemberStateRun(record.id, state);
            }}
          />
        );
      },
    },
    {
      title: '积分',
      dataIndex: 'score',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: '达标情况',
      dataIndex: 'reached',
      width: 100,
      valueEnum: {
        [EBooleanString.YES]: {
          text: '已达标',
        },
        [EBooleanString.NO]: {
          text: '未达标',
        },
      },
    },
    {
      title: '押金',
      dataIndex: 'payment_state',
      width: 100,
      valueEnum: {
        [ETrainingPaymentState.NotRequired]: {
          text: '无需付费',
        },
        [ETrainingPaymentState.Unpaid]: {
          text: '未缴费',
        },
        [ETrainingPaymentState.Paid]: {
          text: '已缴费',
        },
        [ETrainingPaymentState.Refunded]: {
          text: '已退费',
        },
      },
    },
    {
      title: '报名时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 160,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      valueType: 'option',
      width: 180,
      search: false,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <a>编辑</a>
          <Popconfirm
            title="确定要删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              console.log(record);
            }}
          >
            <a>删除</a>
          </Popconfirm>
          <a>打卡记录</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<ITrainingMember>
        headerTitle="成员管理列表"
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        {...PRO_TABLE_DEFAULT_CONFIG}
        request={async ({ pageSize, current, ...rest }) => {
          const res = await queryTrainingMembers({
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
      <TasksModal
        visible={modalVisible}
        handleOk={() => setModalVisible(false)}
        tasks={tasksDatasource}
      />
    </>
  );
};

export default TrainingMember;
