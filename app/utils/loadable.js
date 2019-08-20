import React, { lazy, Suspense } from 'react';

export default (options) => {
  const LazyComponent = lazy(options.loader);

  const Loadable = (props) => {
    const fallback = React.isValidElement(options.loading) ? options.loading : React.createElement(options.loading, {});

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return Loadable;
};
