import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import MarketplaceConnection from './MarketplaceConnection';
import { connect as connectAction, disconnect, loadMarketplace } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectShopify, makeSelectShopee, makeSelectWoocommerce, makeSelectEasystore
} from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadMarketplace: () => dispatch(loadMarketplace()),
  connect: (connectionName, additionalParams, onError) => dispatch(connectAction(connectionName, additionalParams, onError)),
  disconnect: (connectionName) => dispatch(disconnect(connectionName))
});

const mapStateToProps = createStructuredSelector({
  shopify: makeSelectShopify(),
  easystore: makeSelectEasystore(),
  shopee: makeSelectShopee(),
  woocommerce: makeSelectWoocommerce(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'marketplaceConnection', reducer });
const withSaga = injectSaga({ key: 'marketplaceConnection', saga });

export default compose(withReducer, withSaga, withConnect)(MarketplaceConnection);
