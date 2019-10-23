import React from 'react';
import {
  Col, Container, Row
} from 'reactstrap';
import './style.scss';

function EmptyState() {
  return (
    <Container className="show-customer h-100">
      <Row className="align-items-center h-100">
        <Col md={6} className="mx-auto text-center">
          <i className="empty-customer-icon cui-circle-x text-secondary" />
          <div className="font-3xl text-muted pt-3">No Customer Found</div>
        </Col>
      </Row>
    </Container>
  );
}

export default EmptyState;
