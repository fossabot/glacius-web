import React from 'react';
import {
  Container, Collapse, Card, ListGroup, ListGroupItem, CardHeader, Button, Row, Col
} from 'reactstrap';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import './style.scss';

const propTypes = {
  route: PropTypes.object,
  navigateToChangePasswordPage: PropTypes.func,
  navigateToMarketplaceConnectionPage: PropTypes.func,
  navigateToNotificationConnectionPage: PropTypes.func,
  navigateToEasystoreSettingPage: PropTypes.func,
  navigateToShopifySettingPage: PropTypes.func,
  navigateToWoocommerceSettingPage: PropTypes.func,
  location: PropTypes.object,
};

class SettingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { location: { pathname } } = this.props;

    const accordionState = new Array(3).fill(false);

    if (pathname === '/portal/account/easystore-setting' || pathname === '/portal/account/shopify-setting' || pathname === '/portal/account/woocommerce-setting') {
      accordionState[2] = true;
    } else if (pathname === '/portal/account/marketplace-connections' || pathname === '/portal/account/notification-connections') {
      accordionState[1] = true;
    } else {
      accordionState[0] = true;
    }

    this.state = {
      accordion: accordionState
    };
  }

  toggleAccordion = (tab) => {
    const { accordion: prevState } = this.state;
    const accordionState = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: accordionState,
    });
  };

  render() {
    const {
      route, navigateToChangePasswordPage,
      navigateToMarketplaceConnectionPage,
      navigateToNotificationConnectionPage,
      navigateToEasystoreSettingPage,
      navigateToShopifySettingPage,
      navigateToWoocommerceSettingPage,
      location: { pathname },
    } = this.props;
    const { accordion } = this.state;

    return (
      <Container fluid className="setting-page">
        <Row>
          <Col md={3}>
            <div id="accordion">
              <Card className="mb-2">
                <CardHeader className="bg-white p-0">
                  <Button
                    block
                    color="link"
                    className="text-left m-0 text-decoration-none accordion-header"
                    onClick={() => this.toggleAccordion(0)}
                    aria-expanded={accordion[0]}
                    aria-controls="collapseMyAccount"
                  >
                    <h5 className="m-0 p-0">My Account</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={accordion[0]} data-parent="#accordion" id="collapseMyAccount">
                  <ListGroup>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToChangePasswordPage}
                      className={pathname === '/portal/account/password' ? 'font-weight-bold' : ''}
                    >
                      Change Password
                    </ListGroupItem>
                  </ListGroup>
                </Collapse>
              </Card>

              <Card className="mb-2">
                <CardHeader className="bg-white p-0">
                  <Button
                    block
                    color="link"
                    className="text-left m-0 text-decoration-none accordion-header"
                    onClick={() => this.toggleAccordion(1)}
                    aria-expanded={accordion[1]}
                    aria-controls="collapseConnections"
                  >
                    <h5 className="m-0 p-0">Connections</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={accordion[1]} data-parent="#accordion" id="collapseConnections">
                  <ListGroup>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToMarketplaceConnectionPage}
                      className={pathname === '/portal/account/marketplace-connections' ? 'font-weight-bold' : ''}
                    >
                      Marketplaces
                    </ListGroupItem>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToNotificationConnectionPage}
                      className={pathname === '/portal/account/notification-connections' ? 'font-weight-bold' : ''}
                    >
                      Notifications
                    </ListGroupItem>
                  </ListGroup>
                </Collapse>
              </Card>

              <Card className="mb-2">
                <CardHeader className="bg-white p-0">
                  <Button
                    block
                    color="link"
                    className="text-left m-0 text-decoration-none accordion-header"
                    onClick={() => this.toggleAccordion(2)}
                    aria-expanded={accordion[2]}
                    aria-controls="collapseMarketplace"
                  >
                    <h5 className="m-0 p-0">Marketplaces</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={accordion[2]} data-parent="#accordion" id="collapseMarketplace">
                  <ListGroup>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToEasystoreSettingPage}
                      className={pathname === '/portal/account/easystore-setting' ? 'font-weight-bold' : ''}
                    >
                      Easystore
                    </ListGroupItem>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToShopifySettingPage}
                      className={pathname === '/portal/account/shopify-setting' ? 'font-weight-bold' : ''}
                    >
                      Shopify
                    </ListGroupItem>
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={navigateToWoocommerceSettingPage}
                      className={pathname === '/portal/account/woocommerce-setting' ? 'font-weight-bold' : ''}
                    >
                      WooCommerce
                    </ListGroupItem>
                  </ListGroup>
                </Collapse>
              </Card>
            </div>
          </Col>
          <Col md={9}>
            {renderRoutes(route.routes)}
          </Col>
        </Row>
      </Container>
    );
  }
}

SettingPage.propTypes = propTypes;

export default SettingPage;
