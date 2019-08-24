import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';

const propTypes = {
  login: PropTypes.func
};

class LoginPage extends React.PureComponent {
  render() {
    const { login } = this.props;

    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>

        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="5">
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
                                <i className="fa fa-envelope-o" />
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
                                <i className="icon-lock" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              name="password"
                              placeholder="Password"
                              autoComplete="current-password"
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
                            <Col xs="6">
                              <Button
                                color="primary"
                                className="px-4"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                              >Login
                              </Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Formik>

                  </CardBody>
                </Card>
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
