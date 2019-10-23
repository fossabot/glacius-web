import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

const propTypes = {
  setModule: PropTypes.func,
  route: PropTypes.object,
};

class CustomerPage extends React.PureComponent {
  componentDidMount() {
    const { setModule } = this.props;

    setModule('Customers');
  }

  render() {
    const { route } = this.props;

    return (
      <>
        <Helmet>
          <title>Customers</title>
        </Helmet>

        {renderRoutes(route.routes)}
      </>
    );
  }
}

CustomerPage.propTypes = propTypes;

export default CustomerPage;
