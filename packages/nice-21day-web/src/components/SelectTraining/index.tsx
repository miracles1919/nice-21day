import { useModel } from '@umijs/max';
import { Select } from 'antd';
import React, { useEffect } from 'react';

interface ISearchTrainingProps {
  // 最重要的字段是 id、value、onChange
  [key: string]: any;
}
export const SelectTraining: React.FC<ISearchTrainingProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options,
  ...rest
}) => {
  const { loading, allTrainings, queryAllTrainings } =
    useModel('trainingModel');

  useEffect(() => {
    queryAllTrainings();
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
      {allTrainings.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {/* TODO: 这里可能要调整显示的名称 */}
          {/* 例如，展示完整的训练营名称 */}
          {item.name}第{item.period}期
        </Select.Option>
      ))}
    </Select>
  );
};
