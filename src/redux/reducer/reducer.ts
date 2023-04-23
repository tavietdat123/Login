import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../../modules/intl/redux/intlReducer';
import SignUpReducer, { InitSignup } from './reducerSignUp';
import photoReducer, { IntlPhoto } from '../../modules/photo/redux/reducer';
import payrollReducer, { intlPayroll } from '../../modules/table/redux/reducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  sigup: InitSignup;
  photo: IntlPhoto;
  payroll: intlPayroll;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    signup: SignUpReducer,
    photo: photoReducer,
    payroll: payrollReducer,
  });
}
