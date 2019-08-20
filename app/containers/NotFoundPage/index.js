import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';

const mapDispatchToProps = (dispatch) => ({
  navigateToHomePage: () => dispatch(push('/portal'))
});

export default connect(null, mapDispatchToProps)(NotFoundPage);
