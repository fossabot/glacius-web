import React from 'react';
import {
  Row, Col, Card, CardTitle, Button, FormGroup, Label, Input, InputGroup, InputGroupText, FormFeedback, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import './style.scss';
import { ConfirmModal } from 'components/Modals';
import HeaderSection from 'components/HeaderSection';
import { isEqual, pick, forIn } from 'lodash';
import { StickyContainer } from 'react-sticky';
import request from 'utils/request';

const propTypes = {
  mode: PropTypes.oneOf(['Add', 'Edit']),
  navigateToProductPage: PropTypes.func,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  match: PropTypes.object,
  userShop: PropTypes.object
};

class AddEditProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      discardModalState: false,
      initialState: {
        productName: '', productDesc: '', productPrice: '', productStock: ''
      }
    };
  }

  componentDidMount() {
    const { mode } = this.props;

    if (mode === 'Edit') {
      this.loadProduct();
    }
  }

  toggleDiscardModal = () => {
    this.setState((prevState) => ({
      discardModalState: !prevState.discardModalState
    }));
  };

  handleCancelClick = (initialValues, values) => {
    const { navigateToProductPage } = this.props;

    if (!isEqual(initialValues, values)) {
      return this.toggleDiscardModal;
    }

    return navigateToProductPage;
  };

  handleSubmit = (values, formActions) => {
    const {
      mode, createProduct, updateProduct, match
    } = this.props;

    if (mode === 'Add') {
      createProduct(values, formActions);
    } else if (mode === 'Edit') {
      updateProduct(values, formActions, match.params.id);
    }
  };

  computedBtnSubmit = (isSubmitting) => {
    const { mode } = this.props;

    if (isSubmitting) {
      return mode === 'Add' ? 'Creating...' : 'Updating...';
    }

    return mode === 'Add' ? 'Create' : 'Update';
  };

  async loadProduct() {
    const { match, userShop } = this.props;

    const res = await request({
      url: `/product/${match.params.id}`,
      params: { shopId: userShop.id },
      method: 'GET'
    });

    const data = pick(res, ['productName', 'productDesc', 'productPrice', 'productStock']);
    const transformedData = forIn(data, (value, key) => {
      if (value === null) {
        data[key] = '';
      }
    });

    this.setState({
      initialState: transformedData
    });
  }

  render() {
    const { mode, navigateToProductPage } = this.props;
    const { discardModalState, initialState } = this.state;

    return (
      <>
        <StickyContainer className="container add-product">
          <Row>
            <Col lg={10} md={10} sm={12} className="mx-auto">
              <Formik
                enableReinitialize
                initialValues={initialState}
                initialStatus={{
                  productName: false, productDesc: false, productPrice: false, productStock: false
                }}
                onSubmit={this.handleSubmit}
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
                  initialValues
                }) => (
                  <>
                    <HeaderSection
                      className="mb-2"
                      onBackClick={this.handleCancelClick(initialValues, values)}
                      title={`${mode} Product`}
                    >
                      <Button
                        color="secondary"
                        className="px-3 mr-2"
                        onClick={this.handleCancelClick(initialValues, values)}
                      >
                        Discard
                      </Button>
                      <Button
                        color="primary"
                        className="px-4"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {this.computedBtnSubmit(isSubmitting)}
                      </Button>
                    </HeaderSection>

                    <Card body>
                      {status.generalError && (
                        <Alert color="danger">
                          {status.generalError}
                        </Alert>
                      )}
                      <CardTitle tag="h3" className="section-title">Basic Info</CardTitle>
                      <FormGroup>
                        <Label for="productName">Name</Label>
                        <Input
                          type="string"
                          name="productName"
                          placeholder="Brand New Wallet"
                          value={values.productName}
                          onChange={(evt) => {
                            setStatus({ ...status, productName: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.productName}
                        />
                        {status.productName && <FormFeedback>{status.productName}</FormFeedback>}
                      </FormGroup>
                      <FormGroup className="mb-1">
                        <Label for="productDesc">Description</Label>
                        <Input
                          type="textarea"
                          name="productDesc"
                          value={values.productDesc}
                          onChange={(evt) => {
                            setStatus({ ...status, productDesc: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.productDesc}
                        />
                        {status.productDesc && <FormFeedback>{status.productDesc}</FormFeedback>}
                      </FormGroup>
                    </Card>
                    <Card body>
                      <CardTitle tag="h3" className="section-title">Pricing</CardTitle>
                      <FormGroup>
                        <Label for="productPrice">Product Price</Label>
                        <InputGroup>
                          <div className="input-prepend input-group">
                            <InputGroupText>RM</InputGroupText>
                            <Input
                              type="text"
                              name="productPrice"
                              placeholder="0.00"
                              value={values.productPrice}
                              onChange={(evt) => {
                                setStatus({ ...status, productPrice: false });
                                handleChange(evt);
                              }}
                              invalid={!!status.productPrice}
                            />
                            {status.productPrice && <FormFeedback>{status.productPrice}</FormFeedback>}
                          </div>
                        </InputGroup>
                      </FormGroup>
                    </Card>
                    <Card body>
                      <CardTitle tag="h3" className="section-title">Inventory</CardTitle>
                      <FormGroup>
                        <Label for="productStock">Stock</Label>
                        <Input
                          type="text"
                          name="productStock"
                          placeholder="0"
                          value={values.productStock}
                          onChange={(evt) => {
                            setStatus({ ...status, productStock: false });
                            handleChange(evt);
                          }}
                          invalid={!!status.productStock}
                        />
                        {status.productStock && <FormFeedback>{status.productStock}</FormFeedback>}
                      </FormGroup>
                    </Card>
                  </>
                )}
              </Formik>
            </Col>
          </Row>
        </StickyContainer>

        <ConfirmModal
          title="Discard all changes"
          toggle={this.toggleDiscardModal}
          onConfirm={navigateToProductPage}
          isOpen={discardModalState}
          cancelBtnTxt="Cancel"
          confirmBtnTxt="Discard"
          confirmBtnColor="danger"
        >
          All changes will be deleted if you proceed.
        </ConfirmModal>
      </>
    );
  }
}

AddEditProduct.propTypes = propTypes;

export default AddEditProduct;
