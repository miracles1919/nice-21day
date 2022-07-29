import { ProTableProps } from '@ant-design/pro-components';

export const DEFAULT_NAME = 'Umi Max';

/** token key */
export const ACCESS_TOKEN_LOCAL_KEY = 'nice_21day_access_token';

/** pro table 默认配置 */
export const PRO_TABLE_DEFAULT_CONFIG: ProTableProps<any, any> = {
  size: 'small',
  bordered: true,
  search: {
    span: 6,
  },
};
