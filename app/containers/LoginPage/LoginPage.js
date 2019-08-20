import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback
} from 'reactstrap';

class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleValueChange = (key, value) => {
    const { resetError, error } = this.props;

    this.setState({ [key]: value });

    if (error) {
      resetError();
    }
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { email, password } = this.state;

    onSubmit(email, password);
  };

  handleKeyPress = (eventKey) => {
    if (eventKey === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const { error } = this.props;
    const { email, password } = this.state;

    return (
      <div>
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
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope-o"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={({ target: { value } }) => this.handleValueChange('email', value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={({ target: { value } }) => this.handleValueChange('password', value)}
                        onKeyPress={({ key }) => this.handleKeyPress(key)}
                        invalid={!!error}
                      />
                      {error && <FormFeedback>{error}</FormFeedback>}
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
  resetError: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default LoginPage;
