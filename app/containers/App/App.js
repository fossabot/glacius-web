/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const propTypes = {
  route: PropTypes.object
};

function App({ route }) {
  return (
    <>
      <Helmet
        titleTemplate="%s - Glacius MSS"
        defaultTitle="Glacius MSS"
      >
      </Helmet>
      {renderRoutes(route.routes)}
    </>
  );
}

App.propTypes = propTypes;

export default App;
