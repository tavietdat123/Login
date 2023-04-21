import axios from 'axios';
const API_PHOTO = 'https://jsonplaceholder.typicode.com/photos';

export const getPhotoService = (start: number, end: number) => {
  return axios.get(API_PHOTO + `?&_start=${start}&_end=${end}`);
};
// export const getStateService = (id: number) => {
//   return axios.get(API_PATHS.state + id);
// };
// export const register = (data: FormData) => {
//   return axios.post(API_PATHS.signUp, data);
// };
