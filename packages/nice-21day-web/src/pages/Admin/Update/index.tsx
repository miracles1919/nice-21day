import {  ProPageHeader } from '@ant-design/pro-components';
import { history, useMatch } from '@umijs/max';
import UserForm from '../components/UserForm';

const UpdateAdmin: React.FC = () => {
  const match = useMatch('/admin/update/:id')
  if (!match?.params.id) history.back()

  return (
    <>
      <ProPageHeader
        ghost={false}
        prefixedClassName='creat-header'
        onBack={() => history.back()}
      />
      <UserForm id={match?.params.id} successSubmit={() => history.back()}/>
    </>

  )
}

export default UpdateAdmin;
