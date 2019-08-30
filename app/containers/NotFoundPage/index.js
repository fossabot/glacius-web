import { replace } from 'connected-react-router';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';

const mapDispatchToProps = (dispatch) => ({
  navigateToHomePage: () => dispatch(replace('/portal'))
});

export default connect(null, mapDispatchToProps)(NotFoundPage);
