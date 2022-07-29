import { IAttendanceLog } from './attendance-log';
import { EBooleanString, ICommonFields, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

/** 用户打卡积分变更记录 */
export interface IIntegralLog extends ICommonFields {
  /** 用户ID */
  user_id: string;
  /** 用户详情 */
  user?: IUser;
  /** 训练营ID */
  training_id: string;
  /** 训练营详情 */
  training?: ITraining;
  /** 打卡记录ID */
  attendance_log_id: string;
  /** 打卡记录详情 */
  attendance_log?: IAttendanceLog;
  /** 变更前积分 */
  previous_score: number;
  /** 变更后积分 */
  score: number;
  /** 用户积分变更类型 */
  trigger_type: string;
  /** 备注信息 */
  description: string;
}

/** 用户积分变更类型 */
export enum EScoreLogTriggerType {
  /** 有效打卡 */
  Attendance = 'attendance',
  /** 无效打卡 */
  InvalidAttendance = 'invalid_attendance',
  /** 请假 */
  Leave = 'leave',
  /** 缺勤 */
  Absence = 'absence',
}

/** 查询用户积分变更参数 */
export interface IQueryIntegralLogParams
  extends IPageParams,
    Partial<Pick<IIntegralLog, 'user_id' | 'training_id' | 'trigger_type'>> {
  /** 返回值是否携带训练营详情 */
  with_training?: EBooleanString;
  /** 返回值是否携带用户详情 */
  with_user?: EBooleanString;
  /** 返回值是否携带打卡记录详情 */
  with_attendance?: EBooleanString;
}
