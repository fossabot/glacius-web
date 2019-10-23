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
              initialValues={{ old_password: '', password: '', confirm_password: '' }}
              initialStatus={{ old_password: false, password: false, confirm_password: false }}
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
                      <Label for="old_password">Current Password</Label>
                      <Input
                        type="password"
                        name="old_password"
                        value={values.old_password}
                        onChange={(evt) => {
                          setStatus({ ...status, old_password: false });
                          handleChange(evt);
                        }}
                        invalid={!!status.old_password}
                      />
                      <FormText color="muted">
                          Enter the password you currently use to login.
                      </FormText>
                      {status.old_password && <FormFeedback>{status.old_password}</FormFeedback>}
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
                      <Label for="confirm_password">Confirm New Password</Label>
                      <Input
                        type="password"
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={(evt) => {
                          setStatus({ ...status, confirm_password: false });
                          handleChange(evt);
                        }}
                        onKeyPress={({ key }) => {
                          if (key === 'Enter') {
                            handleSubmit();
                          }
                        }}
                        invalid={!!status.confirm_password}
                      />
                      <FormText color="muted">
                          Enter your new password again.
                      </FormText>
                      {status.confirm_password && <FormFeedback>{status.confirm_password}</FormFeedback>}
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
