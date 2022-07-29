import React, { useState } from 'react';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';
import { IUser, ITraining, EAttendanceLogAuditState } from '@nice-21day/shared';
import {
  queryAllUsers,
  queryAllTrainingList,
  changeAttendanceAuditStateAPI,
} from '../../services';

export const useGetNickNameList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nickNameList, setNickNameList] = useState<IUser[]>([]);
  const getNickNameList = async (nick_name: string) => {
    try {
      setLoading(true);
      const res: IUser[] = await queryAllUsers(nick_name);
      if (res.length) setNickNameList(res ?? []);
    } catch (err) {
      message.error('请求错误', 2);
    } finally {
      setLoading(false);
    }
  };
  return {
    nickNameLoading: loading,
    nickNameList,
    getNickNameList,
  };
};

export const useGetTrainingkNameList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [trainingNameList, setTrainingNameList] = useState<ITraining[]>([]);
  const getTrainingNameList = async (name: string) => {
    try {
      setLoading(true);
      const res: ITraining[] = await queryAllTrainingList(name);
      if (res.length) setTrainingNameList(res ?? []);
    } catch (err) {
      message.error('请求错误', 2);
    } finally {
      setLoading(false);
    }
  };
  return {
    trainingNameLoading: loading,
    trainingNameList,
    getTrainingNameList,
  };
};

export const useChangeAttendanceAuditState = () => {
  const changeAttendanceAuditState = async (
    id: string,
    state: EAttendanceLogAuditState,
    actionRef: React.MutableRefObject<ActionType | undefined>,
  ) => {
    try {
      const res = await changeAttendanceAuditStateAPI(id, state);
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    } catch (err) {
      message.error('操作失败');
    }
  };
  return { changeAttendanceAuditState };
};
