import {
  IIntegralLog,
  IPageFactory,
  IQueryIntegralLogParams,
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取积分变更记录（分页）
 */
export const queryIntegralLogs = async (params: IQueryIntegralLogParams) =>
  await request<IPageFactory<IIntegralLog>>('/user-score-logs', { params });
