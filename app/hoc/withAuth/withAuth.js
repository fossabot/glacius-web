import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

export default (WrappedComponent) => {
  const defaultProps = {
    authRequired: true
  };

  const propTypes = {
    checkAuth: PropTypes.func,
    isReady: PropTypes.bool,
    authRequired: PropTypes.bool
  };

  const propsToOmit = Object.keys(propTypes);

  class withAuth extends React.PureComponent {
    componentDidMount() {
      const { checkAuth, authRequired } = this.props;

      if (authRequired) {
        checkAuth();
      }
    }

    render() {
      const { isReady, authRequired } = this.props;
      const attributes = omit(this.props, propsToOmit);

      if (authRequired && !isReady) {
        return null;
      }

      return <WrappedComponent {...attributes} />;
    }
  }

  withAuth.defaultProps = defaultProps;
  withAuth.propTypes = propTypes;
  withAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return withAuth;
};
