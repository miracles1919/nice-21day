import { useModel } from '@umijs/max';
import { Select } from 'antd';
import React, { useEffect } from 'react';

interface ISearchUserProps {
  // 最重要的字段是 id、value、onChange
  [key: string]: any;
}
export const SelectUser: React.FC<ISearchUserProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options,
  ...rest
}) => {
  const { loading, allUsers, queryAllUsers } = useModel('userModel');

  useEffect(() => {
    queryAllUsers();
  }, []);

  return (
    <Select
      {...rest}
      showSearch
      loading={loading}
      allowClear
      virtual
      placeholder="请选择"
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {allUsers.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.nick_name}
        </Select.Option>
      ))}
    </Select>
  );
};
