import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { makeSelectLocation } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import SettingPage from './SettingPage';

const mapDispatchToProps = (dispatch) => ({
  navigateToChangePasswordPage: () => dispatch(push('/portal/account/password')),
  navigateToMarketplaceConnectionPage: () => dispatch(push('/portal/account/marketplace-connections'))
});

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
