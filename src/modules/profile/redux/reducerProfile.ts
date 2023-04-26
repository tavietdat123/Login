import { GET_USER_SUCCESS, LOG_OUT } from './actionProfile';

interface Action {
  type: string;
  payload: any;
}
const intlProfile = {
  infoUser: {
    id: 0,
    email: '',
    name: '',
    gender: '',
    avatar: '',
    region: 0,
    state: 0,
    description: '',
    createdAt: '',
    updatedAt: '',
  },
};
export interface IntlProfile {
  infoUser: InfoUser;
}
interface InfoUser {
  id: number;
  email: string;
  name: string;
  gender: string;
  avatar: string;
  region: number;
  state: number;
  description: any;
  createdAt: string;
  updatedAt: string;
}
export default function reducerProfile(state: IntlProfile = intlProfile, action: Action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        infoUser: action.payload,
      };
    case LOG_OUT:
      return intlProfile;
    default:
      return state;
  }
}
