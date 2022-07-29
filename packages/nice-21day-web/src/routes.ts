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
        name: '管理员列表',
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
        path: '/admin/:id',
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
    path: '/training',
    icon: 'project',
    hideChildrenInMenu: true,
    routes: [
      {
        name: '训练营列表',
        path: '/training',
        component: './Training',
      },
      {
        name: '新建训练营',
        path: '/training/create',
        component: './Training/Create',
      },
      {
        name: '编辑训练营',
        path: '/training/:id',
        component: './Training/Update',
      },
    ],
  },
  {
    name: '训练营成员',
    path: '/training-member',
    icon: 'solution',
    component: './TrainingMember',
  },
  {
    name: '打卡记录',
    path: '/attendance-log',
    icon: 'profile',
    component: './AttendanceLog',
  },

  {
    name: '积分变更记录',
    path: '/integral-log',
    icon: 'payCircle',
    component: './IntegralLog',
  },
  {
    name: '证书',
    path: '/certificate',
    icon: 'idcard',
    component: './Certificate',
  },
] as MenuDataItem[];
