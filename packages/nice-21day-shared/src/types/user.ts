import { EState, IPageParams } from './global';

export interface IUser {
  id: string;
  wechat_openid: string;
  nick_name: string;
  avatar_url: string;
  state: EState;
  description: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: boolean;
  deleted: boolean;
}

/**
 * 注册用户查询参数
 */
export interface IQueryUserParams extends IPageParams {
  nick_name?: string;
  state?: EState;
}
