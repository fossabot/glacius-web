import { logoutUser } from 'components/RequiredAuth/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentModule } from 'containers/App/selectors';
import Header from './Header';

const mapStateToProps = createStructuredSelector({
  currentModule: makeSelectCurrentModule()
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);