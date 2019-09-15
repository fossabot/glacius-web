import React from 'react';
import {
  Col, Row, Card, CardBody, Input, FormFeedback, Button, Label, FormGroup, FormText, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import HeaderSection from 'components/HeaderSection';
import PropTypes from 'prop-types';
import { StickyContainer } from 'react-sticky';

const propTypes = {
  changePassword: PropTypes.func
};

class ChangePassword extends React.PureComponent {
  render() {
    const { changePassword } = this.props;

    return (
      <StickyContainer className="container change-password">
        <Row className="align-items-center h-100">
          <Col md={12}>
            <HeaderSection
              className="mb-2"
              shouldShowBackBtn={false}
              title="Change Password"
            />

            <Formik
              initialValues={{ oldPassword: '', password: '', confirmPassword: '' }}
              initialStatus={{ oldPassword: false, password: false, confirmPassword: false }}
              onSubmit={changePassword}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({
                values, status, handleChange, handleSubmit, isSubmitting, setStatus
              }) => (
                <Card className="p-3">
                  <CardBody>
                    {status.generalError && (
                      <Alert color="danger">
                        {status.generalError}
                      </Alert>
                    )}
                    <FormGroup>
                      <Label for="oldPassword">Current Password</Label>
                      <Input
                        type="password"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={(evt) => {
                          setStatus({ ...status, oldPassword: false });
                          handleChange(evt);
                        }}
                        invalid={!!status.oldPassword}
                      />
                      <FormText color="muted">
                          Enter the password you currently use to login.
                      </FormText>
                      {status.oldPassword && <FormFeedback>{status.oldPassword}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">New Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={(evt) => {
                          setStatus({ ...status, password: false });
                          handleChange(evt);
                        }}
                        invalid={!!status.password}
                      />
                      <FormText color="muted">
                          Enter your new password.
                      </FormText>
                      {status.password && <FormFeedback>{status.password}</FormFeedback>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Label for="confirmPassword">Confirm New Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
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
                      <FormText color="muted">
                          Enter your new password again.
                      </FormText>
                      {status.confirmPassword && <FormFeedback>{status.confirmPassword}</FormFeedback>}
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <Button
                          color="primary"
                          className="w-200"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                            Change Password
                        </Button>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              )}
            </Formik>
          </Col>
        </Row>
      </StickyContainer>
    );
  }
}

ChangePassword.propTypes = propTypes;

export default ChangePassword;
