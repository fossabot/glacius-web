import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import MarketplaceConnection from './MarketplaceConnection';
import { connect as connectAction, disconnect, loadConnection } from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectShopify, makeSelectShopee } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadConnection: () => dispatch(loadConnection()),
  connect: (connectionName, additionalParams, onError) => dispatch(connectAction(connectionName, additionalParams, onError)),
  disconnect: (connectionName) => dispatch(disconnect(connectionName))
});

const mapStateToProps = createStructuredSelector({
  shopify: makeSelectShopify(),
  shopee: makeSelectShopee()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'marketplaceConnection', reducer });
const withSaga = injectSaga({ key: 'marketplaceConnection', saga });

export default compose(withReducer, withSaga, withConnect)(MarketplaceConnection);
