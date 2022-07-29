import { EState, IAdmin } from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取管理员列表（所有的）
 */
export const queryAllAdmins = async () => {
  return await request<IAdmin[]>('/admins');
};

/**
 * 获取某个管理员详情
 */
export const queryAdmin = async (id: string) => {
  return await request<IAdmin>(`/admins/${id}`);
};

/**
 * 新建管理员
 */
export const createAdmin = async (admin: IAdmin) => {
  return await request<IAdmin>('/admins', {
    method: 'POST',
    data: { ...admin },
  });
};

/**
 * 编辑管理员
 */
export const updateAdmin = async (admin: IAdmin) => {
  const { id, ...restData } = admin;
  return await request<IAdmin>(`/admins/${id}`, {
    method: 'PUT',
    data: { ...restData },
  });
};

/**
 * 启用/禁用管理员
 */
export const updateAdminState = async (id: string, state: EState) => {
  return await request<IAdmin>(`/admins/${id}/state`, {
    method: 'PUT',
    data: { state },
  });
};

/**
 * 删除管理员
 */
export const deleteAdmin = async (id: string) => {
  return await request(`/admins/${id}`, {
    method: 'DELETE',
  });
};
