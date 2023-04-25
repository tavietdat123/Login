import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  region: `${getBaseUrl(APIService.public)}/location`,
  state: `${getBaseUrl(APIService.public)}/location?pid=`,
  signUp: `${getBaseUrl(APIService.auth)}/register`,
  profile: `${getBaseUrl(APIService.public)}/user`,
  product: `${getBaseUrl(APIService.public)}/product`,
};
