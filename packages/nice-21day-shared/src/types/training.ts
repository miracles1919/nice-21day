import { EBooleanString, EState, IPageParams } from './global';
import { ITrainingMember } from './training-member';

/** 训练营 */
export interface ITraining {
  id: string;
  /** 训练营名称 */
  name: string;
  /** 训练营类型 */
  type: ETrainingType;
  /** 训练营期数 */
  period: number;
  /** 开始日期 */
  start_time: string;
  /** 结束日期 */
  end_time: string;
  /** 押金费用 */
  fee: number;
  /** 达标积分 */
  standard_score: number;
  /** 训练营进度 */
  progress: ETrainingProgress;
  /** 开启状态 */
  state: EState;
  /** 参加人数 */
  join_user_count?: number;
  /** 当前登录人是否参加报名了 */
  inlude_me?: EBooleanString;
  /** 当前登录人的报名信息 */
  my_join_info?: ITrainingMember;
  /** 备注信息 */
  description: string;
}

/** 训练营状态 */
export enum ETrainingType {
  /** 21天综合训练营 */
  '21Day' = '21day',
  /** 英语 */
  English = 'english',
  /** 运动 */
  Sports = 'sports',
}

/** 训练营进度 */
export enum ETrainingProgress {
  /** 报名中 */
  Registering = 'registering',
  /** 打卡进行中 */
  Processing = 'processing',
  /** 已结束 */
  Finished = 'finished',
}

/** 查询训练营参数 */
export interface IQueryTrainingParams
  extends IPageParams,
    Partial<Pick<ITraining, 'name' | 'type' | 'state' | 'progress'>> {}
