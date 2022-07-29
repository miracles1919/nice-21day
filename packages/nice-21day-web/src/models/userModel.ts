import { queryAllUsers as query } from '@/services';
import { IUser } from '@nice-21day/shared';
import { useCallback, useState } from 'react';

export default () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const queryAllUsers = useCallback(() => {
    setLoading(true);
    query()
      .then((res) => {
        setAllUsers(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { allUsers, queryAllUsers, loading };
};
