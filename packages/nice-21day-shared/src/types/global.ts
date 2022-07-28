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

export interface ICurentUser {
  id: string;
  login_name: string;
  nick_name: string;
  role: 'admin' | 'user';
  avatar?: string;
  wechat_openid?: string;
}
