import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer/reducer';
import enMessages from '../en.json';
import viMessages from '../vi.json';
import cnMessages from '../cn.json';
export function getMessages(locale: string): any {
  if (locale.startsWith('en')) {
    return enMessages;
  } else if (locale.startsWith('cn')) {
    return cnMessages;
  }
  return viMessages;
}
function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
