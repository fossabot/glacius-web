import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import './style.scss';
import { ConfirmModal } from 'components/Modals';
import HeaderSection from 'components/HeaderSection';
import { forIn, isEqual, pick } from 'lodash';
import { StickyContainer } from 'react-sticky';
import request from 'utils/request';
import ProductImage from './ProductImage';

const propTypes = {
  mode: PropTypes.oneOf(['Add', 'Edit']),
  navigateToProductPage: PropTypes.func,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  match: PropTypes.object,
  userShop: PropTypes.object,
};

class AddEditProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadImageNow: false,
      discardModalState: false,
      initialState: {
        name: '',
        description: '',
        images: [],
        product_variants: [{
          price: '',
          stock: '',
        }],
      },
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
      discardModalState: !prevState.discardModalState,
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
      mode, createProduct, updateProduct, match,
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

  loadProduct = async () => {
    const { match, userShop } = this.props;

    const res = await request({
      url: `/product/${match.params.id}`,
      params: { shop_id: userShop.id },
      method: 'GET',
    });

    const data = pick(res, ['name', 'description', 'images']);
    const variantsData = res.product_variants;

    const transformedData = forIn(data, (value, key) => {
      if (value === null) {
        data[key] = '';
      }
    });

    variantsData.forEach((value, key) => {
      variantsData[key] = forIn(value, (variantsValue, variantsKey) => {
        if (variantsValue === null) {
          value[variantsKey] = '';
        }
      });
    });

    transformedData.product_variants = variantsData;

    this.setState({
      initialState: transformedData,
    });

    this.setState({
      loadImageNow: true
    });
  };

  render() {
    const { mode, navigateToProductPage } = this.props;
    const { loadImageNow, discardModalState, initialState } = this.state;

    return (
      <>
        <StickyContainer className="container add-product">
          <Row>
            <Col lg={10} md={10} sm={12} className="mx-auto">
              <Formik
                enableReinitialize
                initialValues={initialState}
                initialStatus={{
                  name: false,
                  description: false,
                  price: false,
                  stock: false,
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
                  setValues,
                  initialValues,
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
                        <Label for="name">Name</Label>
                        <Input
                          type="string"
                          name="name"
                          placeholder="Brand New Wallet"
                          value={values.name}
                          onChange={(evt) => {
                            setStatus({
                              ...status,
                              name: false,
                            });
                            handleChange(evt);
                          }}
                          invalid={!!status.name}
                        />
                        {status.name && <FormFeedback>{status.name}</FormFeedback>}
                      </FormGroup>
                      <FormGroup className="mb-1">
                        <Label for="description">Description</Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={values.description}
                          onChange={(evt) => {
                            setStatus({
                              ...status,
                              description: false,
                            });
                            handleChange(evt);
                          }}
                          invalid={!!status.description}
                        />
                        {status.description && <FormFeedback>{status.description}</FormFeedback>}
                      </FormGroup>
                    </Card>
                    <Card body>
                      <CardTitle tag="h3" className="section-title">Image</CardTitle>
                      <ProductImage
                        shoudLoadImage={loadImageNow}
                        images={values.images}
                        onChange={(newImages) => {
                          setValues({
                            ...values,
                            images: newImages
                          });
                        }}
                      />
                    </Card>
                    <Card body>
                      <CardTitle tag="h3" className="section-title">Pricing</CardTitle>
                      <FormGroup>
                        <Label for="price">Product Price</Label>
                        <InputGroup>
                          <div className="input-prepend input-group">
                            <InputGroupText>RM</InputGroupText>
                            <Input
                              type="text"
                              name="product_variants[0].price"
                              placeholder="0.00"
                              value={values.product_variants[0].price}
                              onChange={(evt) => {
                                setStatus({
                                  ...status,
                                  price: false,
                                });
                                handleChange(evt);
                              }}
                              invalid={!!status.price}
                            />
                            {status.price && <FormFeedback>{status.price}</FormFeedback>}
                          </div>
                        </InputGroup>
                      </FormGroup>
                    </Card>
                    <Card body>
                      <CardTitle tag="h3" className="section-title">Inventory</CardTitle>
                      <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input
                          type="text"
                          name="product_variants[0].stock"
                          placeholder="0"
                          value={values.product_variants[0].stock}
                          onChange={(evt) => {
                            setStatus({
                              ...status,
                              stock: false,
                            });
                            handleChange(evt);
                          }}
                          invalid={!!status.stock}
                        />
                        {status.stock && <FormFeedback>{status.stock}</FormFeedback>}
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
