import { EBooleanString, ICommonFields, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

/** 用户打卡记录 */
export interface IAttendanceLog extends ICommonFields {
  id: string;
  /** 用户ID */
  user_id: string;
  /** 用户详情 */
  user?: IUser;
  /** 训练营ID */
  training_id: string;
  /** 训练营详情 */
  training?: ITraining;
  /** 打卡日期 */
  attendance_date: string;
  /** 打卡内容 */
  attendance_tasks: string;
  /** 审核状态 */
  audit_state: EAttendanceLogAuditState;
  /** 备注信息 */
  description: string;
}

/** 打卡审核状态 */
export enum EAttendanceLogAuditState {
  /** 未审核 */
  Pending = 'pending',
  /** 审核通过 */
  Valid = 'valid',
  /** 审核未通过 */
  Invalid = 'invalid',
}

/** 打卡记录查询参数 */
export interface IQueryAttendanceLogParams
  extends IPageParams,
    Partial<
      Pick<
        IAttendanceLog,
        'user_id' | 'training_id' | 'attendance_date' | 'audit_state'
      >
    > {
  /** 返回值是否包含训练营详情 */
  with_training?: EBooleanString;
  /** 返回值是否包含用户详情 */
  with_user?: EBooleanString;
}
