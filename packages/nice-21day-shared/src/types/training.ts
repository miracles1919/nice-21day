import { EBooleanString, EState } from './global';
export interface ITraining {
  id: string;
  name: string;
  type: ETrainingType;
  period: number;
  start_time: string;
  end_time: string;
  fee: number;
  standard_score: number;
  progress: ETrainingProgress;
  state: EState;
  reached: EBooleanString;

  description: string;
  created_at: string;
  updated_at: string;
  deleted: EBooleanString;
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
