import React from 'react';
import { StickyContainer } from 'react-sticky';
import {
  Card, CardBody, Col, Row, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { upperFirst } from 'lodash';
import HeaderSection from 'components/HeaderSection';
import PropTypes from 'prop-types';
import { ConfirmModal } from 'components/Modals';
import BtnConnectDisconnect from '../../components/BtnConnectDisconnect';

const propTypes = {
  loadMarketplace: PropTypes.func,
  connect: PropTypes.func,
  disconnect: PropTypes.func,
  shopify: PropTypes.object,
  easystore: PropTypes.object,
  shopee: PropTypes.object,
  woocommerce: PropTypes.object
};

class MarketplaceConnection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shopifyShop: '',
      shopifyShopErr: false,
      easystoreShop: '',
      easystoreShopErr: false,
      woocommerceStoreUrl: '',
      woocommerceStoreUrlErr: false,
      confirmModalState: false,
      selectedMarketplaceName: false
    };
  }

  componentDidMount() {
    const { loadMarketplace } = this.props;

    loadMarketplace();
  }

  toggleConfirmModal = (e, selectedMarketplaceName = false) => {
    this.setState((prevState) => ({
      confirmModalState: !prevState.confirmModalState,
      selectedMarketplaceName: !selectedMarketplaceName ? prevState.selectedMarketplaceName : selectedMarketplaceName
    }));
  };

  handleShopifyShopChange = (event) => {
    this.setState({
      shopifyShop: event.target.value
    });
  };

  onShopifyShopError = (err) => {
    this.setState({
      shopifyShopErr: err
    });
  };

  handleEasystoreShopChange = (event) => {
    this.setState({
      easystoreShop: event.target.value
    });
  };

  onEasystoreShopError = (err) => {
    this.setState({
      easystoreShopErr: err
    });
  };

  handleWoocommerceStoreUrlChange = (event) => {
    this.setState({
      woocommerceStoreUrl: event.target.value
    });
  };

  onWoocommerceStoreUrlError = (err) => {
    this.setState({
      woocommerceStoreUrlErr: err
    });
  };

  render() {
    const {
      connect, disconnect, shopify, easystore, shopee, woocommerce
    } = this.props;
    const {
      shopifyShop, shopifyShopErr, easystoreShop, easystoreShopErr, woocommerceStoreUrl, woocommerceStoreUrlErr, confirmModalState, selectedMarketplaceName
    } = this.state;

    return (
      <>
        <StickyContainer className="container marketplaces">
          <Row className="align-items-center h-100">
            <Col md={12}>
              <HeaderSection
                className="mb-2"
                shouldShowBackBtn={false}
                title="Marketplaces"
              />

              <Card className="p-3">
                <CardBody>
                  <FormGroup row>
                    <Label sm={2}>Shopify</Label>
                    <Col sm={10}>
                      <Row>
                        {!shopify && (
                          <Col sm={4}>
                            <Input
                              value={shopifyShop}
                              onChange={this.handleShopifyShopChange}
                              placeholder="Shopify Shop Name"
                              invalid={!!shopifyShopErr}
                              onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                  connect('shopify', { shopifyShop }, this.onShopifyShopError);
                                }
                              }}
                            />
                            {shopifyShopErr && <FormFeedback>{shopifyShopErr}</FormFeedback>}
                          </Col>
                        )}
                        <Col sm={8} className={!shopify ? 'pl-0' : ''}>
                          <BtnConnectDisconnect
                            isConnected={!!shopify}
                            onConnectClick={() => connect('shopify', { shopifyShop }, this.onShopifyShopError)}
                            onDisconnectClick={(e) => this.toggleConfirmModal(e, shopify.name)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>EasyStore</Label>
                    <Col sm={10}>
                      <Row>
                        {!easystore && (
                          <Col sm={4}>
                            <Input
                              value={easystoreShop}
                              onChange={this.handleEasystoreShopChange}
                              placeholder="EasyStore Shop Name"
                              invalid={!!easystoreShopErr}
                              onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                  connect('easystore', { easystoreShop }, this.onEasystoreShopError);
                                }
                              }}
                            />
                            {easystoreShopErr && <FormFeedback>{easystoreShopErr}</FormFeedback>}
                          </Col>
                        )}
                        <Col sm={8} className={!easystore ? 'pl-0' : ''}>
                          <BtnConnectDisconnect
                            isConnected={!!easystore}
                            onConnectClick={() => connect('easystore', { easystoreShop }, this.onEasystoreShopError)}
                            onDisconnectClick={(e) => this.toggleConfirmModal(e, easystore.name)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Shopee</Label>
                    <Col sm={10}>
                      <BtnConnectDisconnect
                        isConnected={!!shopee}
                        onConnectClick={() => connect('shopee')}
                        onDisconnectClick={(e) => this.toggleConfirmModal(e, shopee.name)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mb-0">
                    <Label sm={2}>WooCommerce</Label>
                    <Col sm={10}>
                      <Row>
                        {!woocommerce && (
                          <Col sm={4}>
                            <Input
                              value={woocommerceStoreUrl}
                              onChange={this.handleWoocommerceStoreUrlChange}
                              placeholder="WooCommerce Store Url"
                              invalid={!!woocommerceStoreUrlErr}
                              onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                  connect('woocommerce', { woocommerceStoreUrl }, this.onWoocommerceStoreUrlError);
                                }
                              }}
                            />
                            {woocommerceStoreUrlErr && <FormFeedback>{woocommerceStoreUrlErr}</FormFeedback>}
                          </Col>
                        )}
                        <Col sm={8} className={!woocommerce ? 'pl-0' : ''}>
                          <BtnConnectDisconnect
                            isConnected={!!woocommerce}
                            onConnectClick={() => connect('woocommerce', { woocommerceStoreUrl }, this.onWoocommerceStoreUrlError)}
                            onDisconnectClick={(e) => this.toggleConfirmModal(e, woocommerce.name)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </StickyContainer>

        <ConfirmModal
          title={upperFirst(selectedMarketplaceName)}
          onConfirm={() => disconnect(selectedMarketplaceName)}
          isOpen={confirmModalState}
          toggle={this.toggleConfirmModal}
          size="sm"
          confirmBtnTxt="Disconnect"
          cancelBtnTxt="Cancel"
          bodyClassName="text-center"
          confirmBtnColor="danger"
        >
          You will be disconnect from {selectedMarketplaceName}.
        </ConfirmModal>
      </>
    );
  }
}

MarketplaceConnection.propTypes = propTypes;

export default MarketplaceConnection;
