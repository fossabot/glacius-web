import React from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent, isAuthRequired) => {
  class RequiredAuth extends React.Component {
    componentDidMount() {
      const { checkAuth } = this.props;

      if (isAuthRequired) {
        checkAuth();
      }
    }

    render() {
      const {
        token, userProfile
      } = this.props;

      if (isAuthRequired && (!token || !userProfile)) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  RequiredAuth.propTypes = {
    checkAuth: PropTypes.func,
    token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    userProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  };

  RequiredAuth.displayName = `RequiredAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return RequiredAuth;
};
