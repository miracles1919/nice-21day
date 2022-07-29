import {
  EAttendanceLogAuditState,
  IAttendanceLog,
  IPageFactory,
  IQueryAttendanceLogParams,
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取打卡记录列表（分页）
 */
export const queryAttendanceLogs = async (params: IQueryAttendanceLogParams) =>
  await request<IPageFactory<IAttendanceLog>>('/user-attendance-logs', {
    params,
  });

/**
 * 编辑审核状态
 */
export const updateAttendanceLogAuditState = async (
  id: string,
  audit_state: EAttendanceLogAuditState,
) =>
  await request(`/user-attendance-logs/${id}/audit-state`, {
    method: 'PUT',
    data: { audit_state },
  });
