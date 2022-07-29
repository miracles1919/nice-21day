import { EBooleanString, EState, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

/** 训练营成员 */
export interface ITrainingMember {
  id: string;
  /** 用户ID */
  user_id: string;
  /** 用户详情 */
  user?: IUser;
  /** 训练营ID */
  training_id: string;
  /** 训练营详情 */
  training?: ITraining;
  /** 押金支付状态 */
  payment_state: ETrainingPaymentState;
  /** 是否达标 */
  reached: EBooleanString;
  /** 用户当前积分 */
  score: number;
  /** 启用状态 */
  state: EState;
  /** 用户个人目标JOSN */
  tasks: string;
  /** 备注信息 */
  description: string;
}

/** 押金支付状态 */
export enum ETrainingPaymentState {
  /** 无需支付 */
  NotRequired = 'not_required',
  /** 未支付 */
  Unpaid = 'unpaid',
  /** 已支付 */
  Paid = 'paid',
  /** 已退款 */
  Refunded = 'refunded',
}

/**
 * 个人任务
 */
export interface ITrainingTask {
  name: string;
  description: string;
}

export interface IQueryTrainingMemberParams
  extends IPageParams,
    Partial<
      Pick<ITrainingMember, 'user_id' | 'payment_state' | 'reached' | 'state'>
    > {}
