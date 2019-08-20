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

function App({ route }) {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s - Glacius MSS"
        defaultTitle="Glacius MSS"
      >
      </Helmet>
      {renderRoutes(route.routes)}
    </React.Fragment>
  );
}

App.propTypes = {
  route: PropTypes.object
};

export default App;
