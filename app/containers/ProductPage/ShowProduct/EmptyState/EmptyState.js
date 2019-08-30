import React from 'react';
import {
  Button, Col, Container, Row
} from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  navigateToAddProductPage: PropTypes.func
};

function EmptyState({ navigateToAddProductPage }) {
  return (
    <Container className="show-product h-100">
      <Row className="align-items-center h-100">
        <Col md={6} className="mx-auto text-center">
          <i className="empty-product-icon cui-circle-x text-secondary" />
          <div className="font-3xl text-muted pt-3">No Product Found</div>
          <div className="pt-2">Try to add one product today, it's easy</div>
          <div className="pt-4">
            <Button color="primary" onClick={navigateToAddProductPage}>Add product</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

EmptyState.propTypes = propTypes;

export default EmptyState;
