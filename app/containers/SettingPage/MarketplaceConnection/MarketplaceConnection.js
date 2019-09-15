import React from 'react';
import { StickyContainer } from 'react-sticky';
import {
  Card, CardBody, Col, Row, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { upperFirst } from 'lodash';
import HeaderSection from 'components/HeaderSection';
import PropTypes from 'prop-types';
import { ConfirmModal } from 'components/Modals';
import BtnConnectDisconnect from './BtnConnectDisconnect';

const propTypes = {
  loadConnection: PropTypes.func,
  connect: PropTypes.func,
  disconnect: PropTypes.func,
  shopify: PropTypes.object,
  shopee: PropTypes.object
};

class MarketplaceConnection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shopifyShop: '',
      shopifyShopErr: false,
      confirmModalState: false,
      selectedMarketplaceName: false
    };
  }

  componentDidMount() {
    const { loadConnection } = this.props;

    loadConnection();
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

  render() {
    const {
      connect, disconnect, shopify, shopee
    } = this.props;
    const {
      shopifyShop, shopifyShopErr, confirmModalState, selectedMarketplaceName
    } = this.state;

    return (
      <>
        <StickyContainer className="container marketplaces">
          <Row className="align-items-center h-100">
            <Col md={12}>
              <HeaderSection
                className="mb-2"
                shouldShowBackBtn={false}
                title="Connections"
              />

              <Card className="p-3">
                <CardBody>
                  <FormGroup row>
                    <Label sm={2}>Shopify</Label>
                    <Col sm={10}>
                      <Row>
                        {!shopify && (
                          <Col sm={4}>
                            <Input value={shopifyShop} onChange={this.handleShopifyShopChange} placeholder="Shopify Shop Name" invalid={!!shopifyShopErr} />
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
                  <FormGroup row className="mb-0">
                    <Label sm={2}>Shopee</Label>
                    <Col sm={10}>
                      <BtnConnectDisconnect
                        isConnected={!!shopee}
                        onConnectClick={() => connect('shopee')}
                        onDisconnectClick={(e) => this.toggleConfirmModal(e, shopee.name)}
                      />
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
