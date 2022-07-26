import {  ProPageHeader } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import UserForm from '../components/UserForm';


const CreateAdmin: React.FC = () => {
  return (
    <>
      <ProPageHeader
        ghost={false}
        prefixedClassName='creat-header'
        onBack={() => history.back()}
      />
      <UserForm successSubmit={() => history.back()}/>
    </>

  )
};

export default CreateAdmin;
