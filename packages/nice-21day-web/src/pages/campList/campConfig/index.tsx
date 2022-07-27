import { Button, Select, Form, Input, DatePicker, Space, Switch } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useMemo, useState, useEffect } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import React from 'react';
import styles from './index.less';

const CreateAdmin: React.FC = () => {
  const [isNeed, setNeed] = useState(false);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const switchClick = (checked: boolean) => {
    setNeed(checked);
    console.log(`switch to ${checked}`);
  };
  const switchState = (checked: boolean) => {
    setNeed(checked);
    console.log(`switch to ${checked}`);
  };
  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    console.log('onOk: ', value);
  };
  return (
    <div className={styles.addMain}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Select defaultValue="21day" onChange={handleChange}>
            <Option value="21day">21day</Option>
            <Option value="english">英语阅读</Option>
            <Option value="sports">运动</Option>
          </Select>
        </Form.Item>
        <Form.Item label="进度" name="progress">
          <Select defaultValue="registering" onChange={handleChange}>
            <Option value="registering">报名中</Option>
            <Option value="processing">进行中</Option>
            <Option value="finished">已结束</Option>
          </Select>
        </Form.Item>
        <Form.Item label="第几期" name="period">
          <Input />
        </Form.Item>
        <Form.Item label="达标积分" name="standard_score">
          <Input />
        </Form.Item>
        <Form.Item label="起止时间" name="time">
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
              style={{ width: '550px' }}
            />
          </Space>
        </Form.Item>
        <Form.Item label="是否需要押金" name="isNeed">
          <Switch onChange={switchClick} />
        </Form.Item>
        {isNeed ? (
          <Form.Item label="押金费用" name="fee">
            <Input />
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item label="状态" name="state">
          <Switch onChange={switchState} />
        </Form.Item>
        <Form.Item label="备注信息" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" onClick={() => history.back()}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAdmin;
