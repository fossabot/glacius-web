import React from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent, isAuthRequired) => {
  const propTypes = {
    checkAuth: PropTypes.func,
    isReady: PropTypes.bool
  };

  class RequiredAuth extends React.Component {
    componentDidMount() {
      const { checkAuth } = this.props;

      if (isAuthRequired) {
        checkAuth();
      }
    }

    render() {
      const { isReady } = this.props;

      if (isAuthRequired && !isReady) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  RequiredAuth.propTypes = propTypes;
  RequiredAuth.displayName = `RequiredAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return RequiredAuth;
};
