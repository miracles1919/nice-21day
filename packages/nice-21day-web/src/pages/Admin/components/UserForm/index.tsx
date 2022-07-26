import { createAdmin, queryAdmin, updateAdmin } from '@/services';
import { ProForm, ProFormText, ProFormSwitch, ProCard, } from '@ant-design/pro-components';
import { FormDataType } from './userForm'
import { message } from 'antd';
import { IAdmin, EState } from '@nice-21day/shared';
import React from 'react'


const formItemLayout = {
  labelWrap: false,
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 6 },
  },
  submitter: {

  }
};
interface UserFormProps {
  successSubmit: VoidFunction
  id?: string
}
const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const [form] = ProForm.useForm();
  const requsetOnEdit = async () => {
    let ret: FormDataType = {
      login_name: '',
      nick_name: '',
      password: '',
      confirmword: '',
      state: true
    }
    if (props.id) {
      const res = await queryAdmin(props.id)
      ret = {
        login_name: res.login_name,
        nick_name: res.nick_name,
        state: res.state === 'enable' ?  true : false,
      }
    }
    return ret
  }
  const onFinish = (admin: FormDataType) => {
    const query: IAdmin = { ...admin, state: admin.state ? EState.Enable : EState.Disable }
    Reflect.deleteProperty(query, 'confirmword')
    if (props.id) {
      query.id = props.id
      return updateAdmin(query).then(() => {
        message.success('管理员编辑成功')
        props.successSubmit();
      })
    }
    return createAdmin(query).then(() => {
      message.success('管理员创建成功')
      props.successSubmit();
    })
  }
  return (
    <ProCard direction='column' layout='center'>
      <ProForm
        {...formItemLayout}
        form={form}
        request={requsetOnEdit}
        autoComplete='off'
        autoFocusFirstInput
        grid={true}
        onFinish={onFinish}
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
      >
        <ProFormText
          label="登录名"
          name="login_name"
          rules={[{ required: true, message: "请输入登录名" }]}
        >
        </ProFormText>
        <ProFormText
          label="昵称"
          name="nick_name"
          rules={[{ required: true, message: "请输入昵称" }]}
          allowClear
        >
        </ProFormText>
        {
          !props.id && (
            <>
              <ProFormText.Password
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
                hasFeedback
                allowClear
              >
              </ProFormText.Password>

              <ProFormText.Password
                label="确认密码"
                name="comfirmword"
                rules={[
                  { required: true, message: "请再次输入密码" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入密码不一致!'));
                    },
                  }),
                ]}
                hasFeedback
                allowClear
                placeholder='请再次输入密码'
              >
              </ProFormText.Password>
            </>
          )
        }
        <ProFormSwitch
          label="状态"
          name="state"
          rules={[{ required: true, message: "请输入昵称" }]}
          hasFeedback
        >
        </ProFormSwitch>
      </ProForm>
    </ProCard>
  )
};

export default UserForm;
