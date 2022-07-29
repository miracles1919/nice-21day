import { EState, ICommonFields } from './global';

export interface IAdmin extends ICommonFields {
  id: string;
  /** 登录名称 */
  login_name: string;
  /** 昵称 */
  nick_name: string;
  /** 查询时不会返回密码 */
  password?: string;
  /** 启用状态 */
  state: EState;
}
