import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import WoocommerceSetting from './WoocommerceSetting';
import { makeSelectWoocommerceSettingData } from './selectors';
import {loadWoocommerceSetting, updateWoocommerceSetting} from './actions';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  loadWoocommerceSetting: () => dispatch(loadWoocommerceSetting()),
  updateWoocommerceSetting: (settingData) => dispatch(updateWoocommerceSetting(settingData)),
});

const mapStateToProps = createStructuredSelector({
  settingData: makeSelectWoocommerceSettingData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'woocommerceSetting', reducer });
const withSaga = injectSaga({ key: 'woocommerceSetting', saga });

export default compose(withReducer, withSaga, withConnect)(WoocommerceSetting);
