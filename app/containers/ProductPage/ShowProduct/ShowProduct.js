import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'reactstrap';
import EmptyState from './EmptyState';
import './style.scss';
import DataList from './DataList';

const propTypes = {
  loadProductData: PropTypes.func,
  productData: PropTypes.array,
  navigateToAddProductPage: PropTypes.func
};

class ShowProduct extends React.PureComponent {
  componentDidMount() {
    const { loadProductData } = this.props;

    loadProductData();
  }

  render() {
    const { productData, navigateToAddProductPage } = this.props;

    // empty state
    if (!productData.length) {
      return <EmptyState />;
    }

    return (
      <Card body>
        <div className="d-flex mb-3">
          <div className="pt-2">{productData.length} Products</div>
          <Button color="primary" className="ml-auto" onClick={navigateToAddProductPage}>Add Product</Button>
        </div>

        <DataList data={productData} />
      </Card>
    );
  }
}

ShowProduct.propTypes = propTypes;

export default ShowProduct;
