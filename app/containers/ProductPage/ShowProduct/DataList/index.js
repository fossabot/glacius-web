import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import DataList from './DataList';

const mapDispatchToProps = (dispatch) => ({
  navigateToEditProduct: (productId) => dispatch(push(`/portal/products/edit/${productId}`)),
});

export default connect(null, mapDispatchToProps)(DataList);
