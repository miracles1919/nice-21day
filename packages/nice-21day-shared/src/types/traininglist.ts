import { ITraining } from './training';
export interface ITrainingList {
  limit: number;
  offset: number;
  page: number;
  rows: Array<ITraining>;
  size: number;
  total: number;
}
