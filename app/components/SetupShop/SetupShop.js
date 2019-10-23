import React from 'react';
import {
  Col, Container, Row, Card, Label, Input, FormFeedback, FormGroup, CardBody, Button,
} from 'reactstrap';
import { Formik } from 'formik';
import LoginBrand from 'components/LoginBrand';
import PropTypes from 'prop-types';

const propTypes = {
  createShop: PropTypes.func
};

class SetupShop extends React.PureComponent {
  render() {
    const { createShop } = this.props;

    return (
      <Container className="setup-shop vh-100">
        <Row className="align-items-center h-100">
          <Col md={5} className="mx-auto">
            <LoginBrand />

            <Card className="p-3">
              <CardBody>
                <h5 className="mb-4">Setup your new shop</h5>

                <Formik
                  initialValues={{ name: '', description: '' }}
                  initialStatus={{ name: false, description: false }}
                  onSubmit={createShop}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({
                    values,
                    status,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setStatus,
                  }) => (
                    <>
                      <FormGroup>
                        <Label for="name">Shop Name</Label>
                        <Input
                          type="string"
                          name="name"
                          placeholder="Your new shop name"
                          value={values.name}
                          onChange={(evt) => {
                            setStatus({ ...status, name: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.name}
                        />
                        {status.name && <FormFeedback>{status.name}</FormFeedback>}
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="description">Description</Label>
                        <Input
                          type="textarea"
                          name="description"
                          placeholder="A wallet shop"
                          value={values.description}
                          onChange={(evt) => {
                            setStatus({ ...status, description: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.description}
                        />
                        {status.description && <FormFeedback>{status.description}</FormFeedback>}
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          color="primary"
                          className="px-5"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          Let&#39;s Go
                        </Button>
                      </div>
                    </>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

SetupShop.propTypes = propTypes;

export default SetupShop;
