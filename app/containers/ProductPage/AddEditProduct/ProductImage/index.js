import { makeSelectToken } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ProductImage from './ProductImage';

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken()
});

export default connect(mapStateToProps, null)(ProductImage);
