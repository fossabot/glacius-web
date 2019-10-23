import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import ShopifySetting from './ShopifySetting';
import { loadShopifySetting, updateShopifySetting } from './actions';
import { makeSelectShopifySettingData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  loadShopifySetting: () => dispatch(loadShopifySetting()),
  updateShopifySetting: (settingData) => dispatch(updateShopifySetting(settingData)),
});

const mapStateToProps = createStructuredSelector({
  settingData: makeSelectShopifySettingData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'shopifySetting', reducer });
const withSaga = injectSaga({ key: 'shopifySetting', saga });

export default compose(withReducer, withSaga, withConnect)(ShopifySetting);
