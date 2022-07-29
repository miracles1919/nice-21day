import { request } from '@umijs/max';
/**
 * 查询训练营信息
 */
export const queryAllTrainingList = async (name: string) => {
  return await request('/trainings/as-list', {
    params: { name },
  });
};
