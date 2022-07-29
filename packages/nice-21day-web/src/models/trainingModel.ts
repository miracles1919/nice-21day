import { queryAllTrainingList } from '@/services';
import { ITraining } from '@nice-21day/shared';
import { useCallback, useState } from 'react';

export default () => {
  const [allTrainings, setAllTrainings] = useState<ITraining[]>([]);
  const [loading, setLoading] = useState(false);

  const queryAllTrainings = useCallback(() => {
    setLoading(true);
    queryAllTrainingList()
      .then((res) => {
        setAllTrainings(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { allTrainings, queryAllTrainings, loading };
};
