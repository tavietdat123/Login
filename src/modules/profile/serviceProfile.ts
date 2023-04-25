import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
const token = Cookies.get(ACCESS_TOKEN_KEY);
export const getInfoUserService = () => {
  return axios.get(API_PATHS.profile, {
    headers: {
      Authorization: token,
    },
  });
};
export const updateAvatarFileService = (data: any) => {
  return axios.put(API_PATHS.profile, data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: token,
    },
  });
};
