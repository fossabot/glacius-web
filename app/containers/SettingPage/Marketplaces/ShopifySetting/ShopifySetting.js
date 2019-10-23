import React from 'react';
import { StickyContainer } from 'react-sticky';
import {
  Card, CardBody, Col, FormGroup, Label, Row
} from 'reactstrap';
import HeaderSection from 'components/HeaderSection';
import { AppSwitch } from '@coreui/react';
import PropTypes from 'prop-types';

const propTypes = {
  loadShopifySetting: PropTypes.func,
  updateShopifySetting: PropTypes.func,
  settingData: PropTypes.object,
};

class ShopifySetting extends React.PureComponent {
  componentDidMount() {
    const { loadShopifySetting } = this.props;

    loadShopifySetting();
  }

  handleSettingChanged = (key, value) => {
    const { updateShopifySetting } = this.props;

    updateShopifySetting({ [key]: value });
  };

  render() {
    const { settingData } = this.props;

    return (
      <StickyContainer className="container shopify">
        <Row className="align-items-center h-100">
          <Col md={12}>
            <HeaderSection
              className="mb-2"
              shouldShowBackBtn={false}
              title="Shopify"
            />
            <Card className="p-3">
              <CardBody>
                <FormGroup row className="mb-0">
                  <Label sm={3} className="pt-1">Product Sync</Label>
                  <Col sm={9}>
                    <Row>
                      <AppSwitch
                        size="lg"
                        variant="pill"
                        color="success"
                        checked={settingData.is_product_sync_activated}
                        onChange={(e) => this.handleSettingChanged('is_product_sync_activated', e.target.checked)}
                      />
                    </Row>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </StickyContainer>
    );
  }
}

ShopifySetting.propTypes = propTypes;

export default ShopifySetting;
