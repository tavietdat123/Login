import { FormData } from '../modules/auth/components/SinUpForm';

export interface ILoginParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export interface ISignUpParams extends FormData {}

export interface ILoginValidation {
  email: string;
  password: string;
}
