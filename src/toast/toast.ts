import { toast, ToastOptions } from 'react-toastify';
import toastConfig from './ToastConfig';

export const Toast = (message: string, options?: ToastOptions) => {
  return toast(message, { ...toastConfig, ...options });
};
