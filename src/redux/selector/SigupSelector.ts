import { InitSignup } from '../reducer/reducerSignUp';

interface State {
  router: object;
  intl: object;
  profile: object;
  signup: InitSignup;
}
export const regionSelector = (state: State) => state.signup.region;
export const stateSelector = (state: State) => state.signup.state;
export const loadingSelector = (state: State) => state.signup.loading;
export const errorMessageSelector = (state: State) => state.signup.errorMessage;
