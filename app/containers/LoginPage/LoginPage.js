import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import LoginBrand from 'components/LoginBrand';
import ButtonLoginWithGoogle from 'components/ButtonLoginWithGoogle';
import ButtonLoginWithFacebook from 'components/ButtonLoginWithFacebook';

const propTypes = {
  login: PropTypes.func,
  navigateToRegisterPage: PropTypes.func
};

class LoginPage extends React.PureComponent {
  render() {
    const { login, navigateToRegisterPage } = this.props;

    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>

        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md={5}>
                <LoginBrand />

                <Card className="p-3">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    <Formik
                      initialValues={{ email: '', password: '' }}
                      initialStatus={{ email: false, password: false }}
                      onSubmit={login}
                      validateOnBlur={false}
                      validateOnChange={false}
                    >
                      {({
                        values, status, handleChange, handleSubmit, isSubmitting, setStatus
                      }) => (
                        <>
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
                          <InputGroup className="mb-4">
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
                              onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                  handleSubmit();
                                }
                              }}
                              invalid={!!status.password}
                            />
                            {status.password && <FormFeedback>{status.password}</FormFeedback>}
                          </InputGroup>
                          <Row>
                            <Col xs={6}>
                              <Button
                                color="success"
                                className="px-5"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                              >
                                Login
                              </Button>
                            </Col>
                            <Col xs={6} className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                          <div className="mt-4 text-muted text-center">
                            or login with
                          </div>
                          <Row>
                            <Col xs={6}>
                              <ButtonLoginWithFacebook />
                            </Col>
                            <Col xs={6}>
                              <ButtonLoginWithGoogle />
                            </Col>
                          </Row>
                        </>
                      )}
                    </Formik>

                  </CardBody>
                </Card>

                <div className="mt-5 text-muted text-center">
                  Don&#39;t have an account?
                  <Button
                    color="link"
                    className="py-0 pl-1"
                    style={{ verticalAlign: 'initial' }}
                    onClick={navigateToRegisterPage}
                  >
                    Register
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

LoginPage.propTypes = propTypes;

export default LoginPage;
