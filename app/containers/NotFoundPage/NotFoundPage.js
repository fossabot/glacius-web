import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'reactstrap';
import './style.scss';

const propTypes = {
  navigateToHomePage: PropTypes.func
};

function NotFound({ navigateToHomePage }) {
  return (
    <Container className="mt-5">
      <div className="page-error">
        <div className="page-inner">
          <h1>404</h1>
          <div className="page-description">
            The page you were looking for could not be found.
          </div>
          <div className="mt-3">
            <Button color="primary" size="lg" onClick={navigateToHomePage}>Back to Home</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

NotFound.propTypes = propTypes;

export default NotFound;
