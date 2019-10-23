import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

const propTypes = {
  setModule: PropTypes.func,
  route: PropTypes.object,
};

class OrderPage extends React.PureComponent {
  componentDidMount() {
    const { setModule } = this.props;

    setModule('Orders');
  }

  render() {
    const { route } = this.props;

    return (
      <>
        <Helmet>
          <title>Orders</title>
        </Helmet>

        {renderRoutes(route.routes)}
      </>
    );
  }
}

OrderPage.propTypes = propTypes;

export default OrderPage;
