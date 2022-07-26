import { EState } from '@nice-21day/shared';

export interface FormDataType {
  login_name: string
  nick_name: string
  password?: string
  confirmword?: string
  state: EState | boolean
}
