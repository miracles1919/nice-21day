import { Avatar, Space } from 'antd';
import React from 'react';

interface IUserInfoProps {
  nick_name: string;
  avatar_url?: string;
}
export const UserInfo: React.FC<IUserInfoProps> = ({
  nick_name,
  avatar_url,
}) => (
  <Space size="small">
    {avatar_url && <Avatar src={avatar_url}></Avatar>}
    {nick_name}
  </Space>
);
