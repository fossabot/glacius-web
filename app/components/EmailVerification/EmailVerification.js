import React from 'react';
import {
  Card, CardBody, Col, Container, Row, Button
} from 'reactstrap';
import LoginBrand from 'components/LoginBrand';
import PropTypes from 'prop-types';

const propTypes = {
  checkIsEmailVerified: PropTypes.func,
  resendVerificationEmail: PropTypes.func
};

class EmailVerification extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkIsEmailVerifiedInterval: false
    };
  }

  componentDidMount() {
    const { checkIsEmailVerified } = this.props;

    const checkIsEmailVerifiedInterval = setInterval(checkIsEmailVerified, 5 * 1000);

    this.setState({
      checkIsEmailVerifiedInterval
    });
  }

  componentWillUnmount() {
    const { checkIsEmailVerifiedInterval } = this.state;

    clearInterval(checkIsEmailVerifiedInterval);
  }

  render() {
    const { resendVerificationEmail } = this.props;

    return (
      <Container className="email-verification vh-100">
        <Row className="align-items-center h-100">
          <Col md={5} className="mx-auto">
            <LoginBrand />

            <Card className="p-3">
              <CardBody className="text-center">
                <h5 className="mb-4 ">Please verify your email address</h5>
                <p className="text-black-50 mb-4">Before you can continue, we need you to verify your email.</p>
                <p className="text-muted">Din&#39;t get email?</p>
                <Button color="primary" onClick={resendVerificationEmail}>Resend Verification Email</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

EmailVerification.propTypes = propTypes;

export default EmailVerification;
