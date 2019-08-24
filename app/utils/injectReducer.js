import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 */
export default ({ key, reducer }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    constructor(props, context) {
      super(props, context);

      getInjectors(context.store).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.contextType = ReactReduxContext;
  ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
