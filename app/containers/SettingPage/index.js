import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { makeSelectLocation } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import SettingPage from './SettingPage';

const mapDispatchToProps = (dispatch) => ({
  navigateToChangePasswordPage: () => dispatch(push('/portal/account/password')),
  navigateToMarketplaceConnectionPage: () => dispatch(push('/portal/account/marketplace-connections')),
  navigateToNotificationConnectionPage: () => dispatch(push('/portal/account/notification-connections')),
  navigateToEasystoreSettingPage: () => dispatch(push('/portal/account/easystore-setting')),
  navigateToShopifySettingPage: () => dispatch(push('/portal/account/shopify-setting')),
  navigateToWoocommerceSettingPage: () => dispatch(push('/portal/account/woocommerce-setting')),
});

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
