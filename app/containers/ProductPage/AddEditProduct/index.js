import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserShop } from 'containers/App/selectors';
import AddEditProduct from './AddEditProduct';
import { createProduct, updateProduct } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  navigateToProductPage: () => dispatch(push('/portal/products')),
  createProduct: (values, formActions) => dispatch(createProduct(values, formActions)),
  updateProduct: (values, formActions, productId) => dispatch(updateProduct(values, formActions, productId))
});

const mapStateToProps = createStructuredSelector({
  userShop: makeSelectUserShop()
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditProduct);
