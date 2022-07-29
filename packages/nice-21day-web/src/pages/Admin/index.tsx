import { deleteAdmin, queryAllAdmins } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { IAdmin } from '@nice-21day/shared';
import { history } from '@umijs/max';
import { Button, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';

const Admin: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const [curListLen, setCurListLen] = useState(0);

  const handleDeletAdmin = (id: string) => {
    deleteAdmin(id).then(() => {
      tableRef.current?.reload();
    });
  };
  const columns: ProColumns<IAdmin>[] = [
    {
      title: '登录名',
      dataIndex: 'login_name',
    },
    {
      title: '昵称',
      dataIndex: 'nick_name',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 140,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      align: 'center',
      render: (_, item) => (
        <Space>
          <a onClick={() => history.push(`/admin/${item.id}`)}>编辑</a>
          {curListLen !== 1 && (
            <a
              onClick={() => {
                const { id = '' } = item;
                Modal.confirm({
                  title: `确定要删除管理员${item.nick_name}吗？`,
                  onOk: () => {
                    handleDeletAdmin(id);
                  },
                });
              }}
            >
              删除
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ProTable<IAdmin>
      actionRef={tableRef}
      rowKey="id"
      size="small"
      bordered
      pagination={false}
      request={async () => {
        const admins = await queryAllAdmins();
        setCurListLen(admins.length);
        return {
          success: true,
          data: admins,
        };
      }}
      columns={columns}
      search={false}
      headerTitle="管理员列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => history.push('/admin/create')}
        >
          新建
        </Button>,
      ]}
    />
  );
};

export default Admin;
