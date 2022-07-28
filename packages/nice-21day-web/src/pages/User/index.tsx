import { queryUsers } from '@/services';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { EState, IUser } from '@nice-21day/shared';
import { history } from '@umijs/max';
import { Avatar, Button, Modal, Space } from 'antd';
import React, { useRef } from 'react';

const User: React.FC = () => {
  const tableRef = useRef<ActionType>();

  const handleDeletUser = (id: string) => {
    console.log(id);
  };

  const columns: ProColumns<IUser>[] = [
    {
      title: '用户',
      dataIndex: 'nick_name',
      renderText: (text, record) => {
        return (
          <Space size="small">
            <Avatar src={record.avatar_url}></Avatar>
            {record.nick_name}
          </Space>
        );
      },
    },
    {
      title: '微信 openid',
      dataIndex: 'wechat_openid',
      search: false,
      width: 300,
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
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      search: false,
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            // onClick={() => history.push(`/user/update/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              Modal.confirm({
                title: `确定要删除用户【${record.nick_name}】吗？`,
                onOk: () => {
                  handleDeletUser(record.id);
                },
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<IUser>
      actionRef={tableRef}
      rowKey="id"
      size="small"
      bordered
      search={{
        span: 6,
      }}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryUsers({
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
      columns={columns}
      headerTitle="注册用户列表"
    />
  );
};

export default User;
