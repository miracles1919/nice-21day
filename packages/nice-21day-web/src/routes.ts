import { MenuDataItem } from '@ant-design/pro-components';

export default [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    hideInMenu: true,
    layout: false,
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    name: '管理员',
    path: '/admin',
    icon: 'user',
    hideChildrenInMenu: true,
    routes: [
      {
        name: '管理员',
        path: '/admin',
        icon: 'user',
        component: './Admin',
      },
      {
        name: '新建管理员',
        path: '/admin/create',
        component: './Admin/Create',
      },
      {
        name: '编辑管理员',
        path: '/admin/update/:id',
        component: './Admin/Update',
      },
    ],
  },
  {
    name: '注册用户',
    path: '/user',
    icon: 'team',
    component: './User',
  },
  {
    name: '训练营',
    path: '/campList',
    icon: 'project',
    hideChildrenInMenu: true,
    routes: [
      {
        name: '训练营管理',
        path: '/campList',
        component: './campList',
      },
      {
        name: '新增训练营',
        path: '/campList/edit',
        component: './campList/campConfig',
      },
    ],
  },
  {
    name: '训练营成员',
    path: '/member',
    icon: 'solution',
    component: './Member',
  },
  {
    name: '打卡记录',
    path: '/attendance',
    icon: 'profile',
    component: './Attendance',
  },
  
  {
    name: '积分变更记录',
    path: '/integral',
    icon: 'payCircle',
    component: './Integral',
  },
  {
    name: '证书',
    path: '/certificate',
    icon: 'idcard',
    component: './Certificate',
  },
] as MenuDataItem[];
