import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import './style.scss';

const defaultProps = {
  title: 'Info',
  confirmBtnTxt: 'Ok',
  closeOnConfirmClick: true,
  onConfirm: () => {}
};

const propTypes = {
  title: PropTypes.string,
  confirmBtnTxt: PropTypes.string,
  closeOnConfirmClick: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  onConfirm: PropTypes.func,
};

const propsToOmit = Object.keys(propTypes);

class BasicModal extends React.PureComponent {
  onConfirmClick = (evt) => {
    const { toggle, onConfirm, closeOnConfirmClick } = this.props;

    if (closeOnConfirmClick) {
      toggle();
    }

    onConfirm(evt);
  };

  render() {
    const {
      title, toggle, children, confirmBtnTxt
    } = this.props;
    const attributes = omit(this.props, propsToOmit);

    return (
      <Modal className="basic-modal" toggle={toggle} modalTransition={{ timeout: 150 }} {...attributes}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className="text-center">{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onConfirmClick}>{confirmBtnTxt}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

BasicModal.defaultProps = defaultProps;
BasicModal.propTypes = propTypes;

export default BasicModal;
