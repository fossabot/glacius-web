import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import ChangePassword from './ChangePassword';
import saga from './saga';
import { changePassword } from './actions';

const mapDispatchToProps = (dispatch) => ({
  changePassword: (values, formActions) => dispatch(changePassword(values, formActions)),
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'changePassword', saga });

export default compose(withSaga, withConnect)(ChangePassword);
