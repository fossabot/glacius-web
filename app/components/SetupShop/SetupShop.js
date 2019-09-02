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
                  initialValues={{ shopName: '', shopDesc: '' }}
                  initialStatus={{ shopName: false, shopDesc: false }}
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
                        <Label for="shopName">Shop Name</Label>
                        <Input
                          type="string"
                          name="shopName"
                          placeholder="Your new shop name"
                          value={values.shopName}
                          onChange={(evt) => {
                            setStatus({ ...status, shopName: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.shopName}
                        />
                        {status.shopName && <FormFeedback>{status.shopName}</FormFeedback>}
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="shopDesc">Description</Label>
                        <Input
                          type="textarea"
                          name="shopDesc"
                          placeholder="A wallet shop"
                          value={values.shopDesc}
                          onChange={(evt) => {
                            setStatus({ ...status, shopDesc: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.shopDesc}
                        />
                        {status.shopDesc && <FormFeedback>{status.shopDesc}</FormFeedback>}
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
