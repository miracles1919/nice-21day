import { SelectTraining } from '@/components/SelectTraining';
import { SelectUser } from '@/components/SelectUser';
import {
  changeAttendanceAuditStateAPI,
  queryAttendanceListAPI,
} from '@/services/attendance';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { EAttendanceLogAuditState, IAttendanceLog } from '@nice-21day/shared';
import { Button } from 'antd';
import React from 'react';

const Attendance: React.FC = () => {
  const actionRef = React.useRef<ActionType>();

  const handleChangeAuditState = (
    id: string,
    state: EAttendanceLogAuditState,
  ) => {
    changeAttendanceAuditStateAPI(id, state);
  };

  const columns: ProColumns<IAttendanceLog>[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      search: false,
      render: (_, record) => {
        return record.user?.nick_name || record.user_id;
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
      title: '打卡内容',
      dataIndex: 'attendance_tasks',
      search: false,
      ellipsis: true,
      width: 200,
    },
    {
      title: '提交时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '审核状态',
      dataIndex: 'audit_state',
      valueType: 'select',
      valueEnum: {
        [EAttendanceLogAuditState.Pending]: {
          text: '未审核',
          status: 'Processing',
        },
        [EAttendanceLogAuditState.Valid]: {
          text: '审核通过',
          status: 'Success',
        },
        [EAttendanceLogAuditState.Invalid]: {
          text: '审核未通过',
          status: 'Error',
        },
      },
    },
    {
      title: '编辑时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '补卡',
      dataIndex: 'reissueTime',
      valueType: 'date',
      search: false,
      // TODO: 当提交时间的日期和 attendance_date 不是同一天是就是补卡
    },
    {
      title: '备注',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() =>
              handleChangeAuditState(record.id, EAttendanceLogAuditState.Valid)
            }
          >
            审核通过
          </Button>
          <Button
            type="link"
            onClick={() =>
              handleChangeAuditState(
                record.id,
                EAttendanceLogAuditState.Invalid,
              )
            }
          >
            审核未通过
          </Button>
        </>
      ),
    },
  ];
  return (
    <ProTable<IAttendanceLog>
      bordered
      headerTitle="打卡记录列表"
      columns={columns}
      rowKey="id"
      actionRef={actionRef}
      search={{ collapsed: false }}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryAttendanceListAPI({
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

export default Attendance;
