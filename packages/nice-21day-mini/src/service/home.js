import { GETCOMPLIST } from './api/home';
import gtajx from './index';
export const getCompList = (params) => {
  return gtajx.get(GETCOMPLIST, params);
};
