import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardBody
} from 'reactstrap';

const propTypes = {
  setModule: PropTypes.func
};

class DashboardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { setModule } = this.props;

    setModule('Dashboard');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card>
              <CardBody>
                <div className="h4 m-0 pb-2">header</div>
                <div>body</div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card>
              <CardBody>
                <div className="h4 m-0 pb-2">header</div>
                <div>body</div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card>
              <CardBody>
                <div className="h4 m-0 pb-2">header</div>
                <div>body</div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card>
              <CardBody>
                <div className="h4 m-0 pb-2">header</div>
                <div>body</div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

DashboardPage.propTypes = propTypes;

export default DashboardPage;
