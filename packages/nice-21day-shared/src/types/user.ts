import { EState, ICommonFields, IPageParams } from './global';

/** 注册用户 */
export interface IUser extends ICommonFields {
  id: string;
  /** 微信 openid */
  wechat_openid: string;
  /** 昵称 */
  nick_name: string;
  /** 头像 */
  avatar_url: string;
  /** 启用标识 */
  state: EState;
  /** 备注信息 */
  description: string;
}

/**
 * 注册用户查询参数
 */
export interface IQueryUserParams
  extends IPageParams,
    Partial<Pick<IUser, 'nick_name' | 'state'>> {}
