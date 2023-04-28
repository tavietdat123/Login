import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { FormDataCreateProduct } from './component/ProductDialog';
export const getPayrollService = () => {
  return axios.get(API_PATHS.product, {
    headers: {
      Authorization: Cookies.get(ACCESS_TOKEN_KEY),
    },
  });
};
export const getPayrollByIdService = (id: number) => {
  return axios.get(API_PATHS.product + '/' + id, {
    headers: {
      Authorization: Cookies.get(ACCESS_TOKEN_KEY),
    },
  });
};
export const postPayrollService = (data: FormDataCreateProduct) => {
  return axios.post(API_PATHS.product, data, {
    headers: {
      Authorization: Cookies.get(ACCESS_TOKEN_KEY),
    },
  });
};
export const deletePayrollService = (data: number) => {
  return axios.delete(API_PATHS.product + '/' + data, {
    headers: {
      Authorization: Cookies.get(ACCESS_TOKEN_KEY),
    },
  });
};
export const putPayrollService = (data: FormDataCreateProduct) => {
  return axios.put(API_PATHS.product, data, {
    headers: {
      Authorization: Cookies.get(ACCESS_TOKEN_KEY),
    },
  });
};
