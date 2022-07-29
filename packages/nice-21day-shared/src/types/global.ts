export enum EState {
  /** 启用 */
  Enable = 'enable',
  /** 禁用 */
  Disable = 'disable',
}

/**
 * 字符串布尔值
 * 0 - false
 * 1 - true
 */
export enum EBooleanString {
  NO = '0',
  YES = '1',
}

/**
 * 分页查询参数
 */
export interface IPageParams {
  /** 从 1 开始 */
  page: number;
  size: number;
}

/** 分页封装器 */
export interface IPageFactory<T> extends IPageParams {
  rows: T[];
  total: number;
}

/** 当前登录人 */
export interface ICurentUser {
  id: string;
  login_name: string;
  nick_name: string;
  /** 角色 */
  role: 'admin' | 'user';
  avatar?: string;
  wechat_openid?: string;
}

export interface ICommonFields {
  deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: boolean;
}
