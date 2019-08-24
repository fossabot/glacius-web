import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 */
export default ({ key, saga, mode }) => (WrappedComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    injectors = getInjectors(this.context.store); // eslint-disable-line react/destructuring-assignment

    constructor(props, context) {
      super(props, context);
      this.injectors = getInjectors(context.store);
      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  InjectSaga.contextType = ReactReduxContext;
  InjectSaga.displayName = `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
