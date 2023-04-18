import { Region, State } from '../../modules/auth/components/SinUpForm';
import {
  ERROR_MESSAGE,
  GET_REGION_SUCCESS,
  GET_STATE_SUCCESS,
  OFF_LOADING,
  ON_LOADING,
  REGISTER_SUCCESS,
} from '../actions/actionSignUp';
const initialState = {
  region: [],
  state: [],
  loading: false,
  errorMessage: '',
};
interface Action {
  type: string;
  payload?: any;
}
export interface InitSignup {
  region: Region[];
  state: State[];
  loading: boolean;
  errorMessage: string;
}
const SignUpReducer = (state = initialState, action: Action) => {
  console.log(action);
  switch (action.type) {
    case GET_REGION_SUCCESS:
      return {
        ...state,
        region: action.payload,
      };
    case GET_STATE_SUCCESS:
      return {
        ...state,
        state: action.payload,
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case OFF_LOADING:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {};
    default:
      return state;
  }
};
export default SignUpReducer;
