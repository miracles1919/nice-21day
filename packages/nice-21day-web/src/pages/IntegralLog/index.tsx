import { SelectTraining } from '@/components/SelectTraining';
import { SelectUser } from '@/components/SelectUser';
import { UserInfo } from '@/components/UserInfo';
import { PRO_TABLE_DEFAULT_CONFIG } from '@/constants';
import { queryIntegralLogs } from '@/services/integral-log';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { EScoreLogTriggerType, IIntegralLog } from '@nice-21day/shared';
import React from 'react';

const IntegralLog: React.FC = () => {
  const columns: ProColumns<IIntegralLog>[] = [
    {
      title: '成员',
      dataIndex: 'nick_name',
      key: 'nick_name',
      search: false,
      render: (_, record) => {
        return (
          <UserInfo
            nick_name={record.user?.nick_name || record.user_id}
            avatar_url={record?.user?.avatar_url}
          />
        );
      },
    },
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
      render: (_, record) => {
        return record.training?.name || record.training_id;
      },
      renderFormItem: (_, props) => <SelectTraining {...props} />,
    },
    {
      title: '变更前积分',
      dataIndex: 'previous_score',
      search: false,
      ellipsis: true,
      width: 120,
    },
    {
      title: '变更后积分',
      dataIndex: 'score',
      search: false,
      ellipsis: true,
      width: 120,
    },
    {
      title: '变更原因',
      dataIndex: 'trigger_type',
      valueType: 'select',
      valueEnum: {
        [EScoreLogTriggerType.Attendance]: {
          text: '有效打卡',
        },
        [EScoreLogTriggerType.InvalidAttendance]: {
          text: '无效打卡',
        },
        [EScoreLogTriggerType.Leave]: {
          text: '请假',
        },
        [EScoreLogTriggerType.Absence]: {
          text: '缺勤',
        },
      },
    },
    {
      title: '变更记录',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: '变更时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
    },
  ];
  return (
    <ProTable<IIntegralLog>
      rowKey="id"
      headerTitle="积分变更列表"
      columns={columns}
      {...PRO_TABLE_DEFAULT_CONFIG}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryIntegralLogs({
          ...rest,
          size: pageSize!,
          page: current!,
        });
        return {
          data: res.rows,
          total: res.total,
          success: true,
        };
      }}
    />
  );
};

export default IntegralLog;
