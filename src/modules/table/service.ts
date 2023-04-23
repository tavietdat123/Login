import axios from 'axios';
const API = '/api/payroll';
export const getPayrollService = () => {
  return axios.get(API);
};
