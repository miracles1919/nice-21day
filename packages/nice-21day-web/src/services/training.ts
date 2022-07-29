import {
  IPageFactory,
  IQueryTrainingParams,
  ITraining,
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 查询训练营列表（所有的）
 */
export const queryAllTrainings = async (name?: string) => {
  return await request<ITraining[]>('/trainings/as-list', {
    params: { name },
  });
};

/**
 * 查询训练营列表（分页）
 */
export const queryTrainings = async (params: IQueryTrainingParams) => {
  return await request<IPageFactory<ITraining>>('/trainings', {
    params,
  });
};

/**
 * 创建训练营
 */
export const createTraining = async (data: ITraining) => {
  return await request<ITraining>('/trainings', {
    method: 'POST',
    data: { ...data },
  });
};
