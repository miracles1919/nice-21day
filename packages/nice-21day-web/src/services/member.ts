import { IQueryTrainingMemberParams } from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 训练营成员分页列表
 */
export const queryUsersList = async (params: IQueryTrainingMemberParams) => {
    return await request('/training-users', { params });
};

/**
 * 启用，禁用
 */
export const changeUsersState = async (
    id: string,
    state: string,
) => {
    return (
        await request(`training-users/${id}/state`, {
            method: 'PUT',
            data: { state },
        })
    )
}

