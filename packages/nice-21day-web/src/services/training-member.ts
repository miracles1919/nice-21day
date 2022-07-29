import {
  EState,
  IPageFactory,
  IQueryTrainingMemberParams,
  ITrainingMember,
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 训练营成员列表（分页）
 */
export const queryTrainingMembers = async (
  params: IQueryTrainingMemberParams,
) => {
  return await request<IPageFactory<ITrainingMember>>('/training-users', {
    params,
  });
};

/**
 * 启用，禁用
 */
export const updateTrainingMemberState = async (id: string, state: EState) => {
  return await request(`training-users/${id}/state`, {
    method: 'PUT',
    data: { state },
  });
};
