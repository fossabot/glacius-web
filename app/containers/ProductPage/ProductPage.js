import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const propTypes = {
  setModule: PropTypes.func,
  route: PropTypes.object,
};

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const { setModule } = this.props;

    setModule('Products');
  }

  render() {
    const { route } = this.props;

    return (
      <>
        <Helmet>
          <title>Products</title>
        </Helmet>

        {renderRoutes(route.routes)}
      </>
    );
  }
}

ProductPage.propTypes = propTypes;

export default ProductPage;
