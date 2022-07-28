import { IPageFactory, IQueryUserParams, IUser } from '@nice-21day/shared';
import { request } from '@umijs/max';
/**
 * 查询用户信息
 */
export const queryAllUsers = async (nick_name?: string) => {
  return await request<IUser[]>('/users/as-list', {
    params: { nick_name },
  });
};

/**
 * 查询用户信息分页数据
 */
export const queryUsers = async (params: IQueryUserParams) => {
  return await request<IPageFactory<IUser>>('/users', {
    params: { ...params },
  });
};
