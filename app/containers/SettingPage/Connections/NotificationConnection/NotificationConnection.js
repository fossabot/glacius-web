import React from 'react';
import { StickyContainer } from 'react-sticky';
import {
  Card, CardBody, Col, FormGroup, Label, Row
} from 'reactstrap';
import HeaderSection from 'components/HeaderSection';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';
import { ConfirmModal } from 'components/Modals';
import BtnConnectDisconnect from '../../components/BtnConnectDisconnect';

const propTypes = {
  loadNotification: PropTypes.func,
  connect: PropTypes.func,
  disconnect: PropTypes.func,
  telegram: PropTypes.object,
};

class NotificationConnection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      confirmModalState: false,
      selectedNotificationName: false
    };
  }

  componentDidMount() {
    const { loadNotification } = this.props;

    loadNotification();
  }

  toggleConfirmModal = (e, selectedNotificationName = false) => {
    this.setState((prevState) => ({
      confirmModalState: !prevState.confirmModalState,
      selectedNotificationName: !selectedNotificationName ? prevState.selectedNotificationName : selectedNotificationName
    }));
  };

  render() {
    const {
      connect, disconnect, telegram
    } = this.props;

    const { confirmModalState, selectedNotificationName } = this.state;

    return (
      <>
        <StickyContainer className="container notifications">
          <Row className="align-items-center h-100">
            <Col md={12}>
              <HeaderSection
                className="mb-2"
                shouldShowBackBtn={false}
                title="Notifications"
              />

              <Card className="p-3">
                <CardBody>
                  <FormGroup row className="mb-0">
                    <Label sm={2}>Telegram</Label>
                    <Col sm={10}>
                      <BtnConnectDisconnect
                        isConnected={!!telegram}
                        onConnectClick={() => connect('telegram')}
                        onDisconnectClick={(e) => this.toggleConfirmModal(e, telegram.name)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </StickyContainer>

        <ConfirmModal
          title={upperFirst(selectedNotificationName)}
          onConfirm={() => disconnect(selectedNotificationName)}
          isOpen={confirmModalState}
          toggle={this.toggleConfirmModal}
          size="sm"
          confirmBtnTxt="Disconnect"
          cancelBtnTxt="Cancel"
          bodyClassName="text-center"
          confirmBtnColor="danger"
        >
          You will be disconnect from {selectedNotificationName}.
        </ConfirmModal>
      </>
    );
  }
}

NotificationConnection.propTypes = propTypes;

export default NotificationConnection;
