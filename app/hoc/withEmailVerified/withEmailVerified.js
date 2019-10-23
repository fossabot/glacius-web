import React from 'react';
import PropTypes from 'prop-types';
import EmailVerification from 'components/EmailVerification/Loadable';
import { omit } from 'lodash';

export default (WrappedComponent) => {
  const propTypes = {
    isEmailVerified: PropTypes.bool,
  };

  const propsToOmit = Object.keys(propTypes);

  class withEmailVerified extends React.PureComponent {
    render() {
      const { isEmailVerified } = this.props;
      const attributes = omit(this.props, propsToOmit);

      if (!isEmailVerified) {
        return <EmailVerification />;
      }

      return <WrappedComponent {...attributes} />;
    }
  }

  withEmailVerified.propTypes = propTypes;
  withEmailVerified.displayName = `withEmailVerified(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return withEmailVerified;
};
