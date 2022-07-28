import { Button, Select, Form, Input, DatePicker, Space, Switch } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useMemo, useState, useEffect } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import React from 'react';
import styles from './index.less';
import { addTraining } from '@/services/camp';
const CreateAdmin: React.FC = () => {
  const [isNeed, setNeed] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const time = values['time'];
    const params = {
      ...values,
      start_time: time[0].format('YYYY-MM-DD'),
      end_time: time[1].format('YYYY-MM-DD'),
    };
    addTraining(params).then((res) => {
      console.log(res);
    });
    // console.log('Success:', params);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const typeChange = (value: string) => {
    form.setFieldsValue({ type: value });
  };
  const progressChange = (value: string) => {
    form.setFieldsValue({ progress: value });
  };
  const DateChoose = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    form.setFieldsValue({ start_time: dateString[0], end_time: dateString[1] });
  };
  const switchClick = (checked: boolean) => {
    setNeed(checked);
    console.log(`switch to ${checked}`);
  };
  const changeState = (checked: boolean) => {
    checked
      ? form.setFieldsValue({ state: 'enable' })
      : form.setFieldsValue({ state: 'disable' });
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
        form={form}
        initialValues={{ type: '21day', progress: 'registering' }}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Select defaultValue="21day" onChange={typeChange}>
            <Option value="21day">21day</Option>
            <Option value="english">英语阅读</Option>
            <Option value="sports">运动</Option>
          </Select>
        </Form.Item>
        <Form.Item label="进度" name="progress">
          <Select defaultValue="registering" onChange={progressChange}>
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
          <RangePicker onChange={DateChoose} style={{ width: '550px' }} />
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
          <Switch onChange={changeState} />
        </Form.Item>
        <Form.Item label="备注信息" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item className={styles.btnPart}>
          <Button type="primary" htmlType="submit" className={styles.btn}>
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
