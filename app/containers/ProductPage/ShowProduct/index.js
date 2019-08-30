import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import ShowProduct from './ShowProduct';
import { loadProductData } from '../actions';
import { makeSelectProductData } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  navigateToAddProductPage: () => dispatch(push('/portal/products/add')),
  loadProductData: () => dispatch(loadProductData())
});

const mapStateToProps = createStructuredSelector({
  productData: makeSelectProductData()
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowProduct);
