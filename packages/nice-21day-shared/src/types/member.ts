import { EBooleanString, EState, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

export interface ITrainingMember {
  id: string;
  user_id: string;
  user?: IUser;
  training_id: string;
  training?: ITraining;
  description: string;
  created_at: string;
  updated_at: string;
  payment_state: ETrainingPaymentState;
  reached: EBooleanString;
  score: number;
  state: EState;
  tasks: string;
}

export interface IQueryTrainingMemberParams extends IPageParams {
  user_id?: string;
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
