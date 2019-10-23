import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import EasystoreSetting from './EasystoreSetting';
import { loadEasystoreSetting, updateEasystoreSetting } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectEasystoreSettingData } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadEasystoreSetting: () => dispatch(loadEasystoreSetting()),
  updateEasystoreSetting: (settingData) => dispatch(updateEasystoreSetting(settingData)),
});

const mapStateToProps = createStructuredSelector({
  settingData: makeSelectEasystoreSettingData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'easystoreSetting', reducer });
const withSaga = injectSaga({ key: 'easystoreSetting', saga });

export default compose(withReducer, withSaga, withConnect)(EasystoreSetting);
