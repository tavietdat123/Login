import axios from 'axios';
import { API_PATHS } from '../../../configs/api';
import { FormData } from '../components/SinUpForm';

export const getRegionService = () => {
  return axios.get(API_PATHS.region);
};
export const getStateService = (id: number) => {
  return axios.get(API_PATHS.state + id);
};
export const register = (data: FormData) => {
  return axios.post(API_PATHS.signUp, data);
};
