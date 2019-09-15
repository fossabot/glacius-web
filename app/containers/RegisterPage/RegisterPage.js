import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Container, Row, Col, Card, CardBody, InputGroupAddon, InputGroupText, Input, FormFeedback, InputGroup, Button, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import LoginBrand from 'components/LoginBrand';

const propTypes = {
  register: PropTypes.func,
  navigateToLoginPage: PropTypes.func
};

class RegisterPage extends React.PureComponent {
  render() {
    const { register, navigateToLoginPage } = this.props;

    return (
      <>
        <Helmet>
          <title>Register</title>
        </Helmet>

        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md={5}>
                <LoginBrand />

                <Card className="p-3">
                  <CardBody>
                    <h3>Register</h3>
                    <p className="text-muted">Get started with your account today.</p>

                    <Formik
                      initialValues={{
                        name: '', email: '', password: '', confirmPassword: ''
                      }}
                      initialStatus={{
                        name: false, email: false, password: false, confirmPassword: false
                      }}
                      onSubmit={register}
                      validateOnBlur={false}
                      validateOnChange={false}
                    >
                      {({
                        values, status, handleChange, handleSubmit, isSubmitting, setStatus
                      }) => (
                        <>
                          {status.generalError && (
                            <Alert color="danger">
                              {status.generalError}
                            </Alert>
                          )}
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              autoFocus
                              name="name"
                              placeholder="Name"
                              autoComplete="name"
                              value={values.name}
                              onChange={(evt) => {
                                setStatus({ ...status, name: false });
                                handleChange(evt);
                              }}
                              invalid={!!status.name}
                            />
                            {status.name && <FormFeedback>{status.name}</FormFeedback>}
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-envelope" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              autoFocus
                              type="email"
                              name="email"
                              placeholder="Email"
                              autoComplete="email"
                              value={values.email}
                              onChange={(evt) => {
                                setStatus({ ...status, email: false });
                                handleChange(evt);
                              }}
                              invalid={!!status.email}
                            />
                            {status.email && <FormFeedback>{status.email}</FormFeedback>}
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-lock" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={values.password}
                              onChange={(evt) => {
                                setStatus({ ...status, password: false });
                                handleChange(evt);
                              }}
                              invalid={!!status.password}
                            />
                            {status.password && <FormFeedback>{status.password}</FormFeedback>}
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-lock" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              value={values.confirmPassword}
                              onChange={(evt) => {
                                setStatus({ ...status, confirmPassword: false });
                                handleChange(evt);
                              }}
                              onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                  handleSubmit();
                                }
                              }}
                              invalid={!!status.confirmPassword}
                            />
                            {status.confirmPassword && <FormFeedback>{status.confirmPassword}</FormFeedback>}
                          </InputGroup>
                          <Row>
                            <Col md={12}>
                              <Button
                                block
                                color="primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                              >
                                Register
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Formik>
                  </CardBody>
                </Card>

                <div className="mt-5 text-muted text-center">
                  Already have an account?
                  <Button
                    color="link"
                    className="py-0 pl-1"
                    style={{ verticalAlign: 'initial' }}
                    onClick={navigateToLoginPage}
                  >
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

RegisterPage.propTypes = propTypes;

export default RegisterPage;
