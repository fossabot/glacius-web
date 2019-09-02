import React from 'react';
import PropTypes from 'prop-types';
import SetupShop from 'components/SetupShop/Loadable';
import { omit } from 'lodash';

export default (WrappedComponent) => {
  const propTypes = {
    isShopSet: PropTypes.bool,
  };

  const propsToOmit = Object.keys(propTypes);

  class withUserShop extends React.PureComponent {
    render() {
      const { isShopSet } = this.props;
      const attributes = omit(this.props, propsToOmit);

      if (!isShopSet) {
        return <SetupShop />;
      }

      return <WrappedComponent {...attributes} />;
    }
  }

  withUserShop.propTypes = propTypes;
  withUserShop.displayName = `withUserShop(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return withUserShop;
};
