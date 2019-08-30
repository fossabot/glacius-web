import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import EmptyState from './EmptyState';

const mapDispatchToProps = (dispatch) => ({
  navigateToAddProductPage: () => dispatch(push('/portal/products/add')),
});

export default connect(null, mapDispatchToProps)(EmptyState);
