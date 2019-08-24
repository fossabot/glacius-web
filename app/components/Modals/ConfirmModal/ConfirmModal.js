import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { omit } from 'lodash';
import './style.scss';

const defaultProps = {
  title: 'Confirmation',
  confirmBtnTxt: 'Yes',
  cancelBtnTxt: 'No',
  onCancel: () => {},
  closeOnConfirmClick: true,
  closeOnCancelClick: true,
};

const propTypes = {
  title: PropTypes.string,
  confirmBtnTxt: PropTypes.string,
  cancelBtnTxt: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  closeOnConfirmClick: PropTypes.bool,
  closeOnCancelClick: PropTypes.bool
};

const propsToOmit = Object.keys(propTypes);

class ConfirmModal extends React.PureComponent {
  onConfirmClick = (evt) => {
    const { toggle, onConfirm, closeOnConfirmClick } = this.props;

    if (closeOnConfirmClick) {
      toggle();
    }

    onConfirm(evt);
  };

  onCancelClick = (evt) => {
    const { toggle, onCancel, closeOnCancelClick } = this.props;

    if (closeOnCancelClick) {
      toggle();
    }

    onCancel(evt);
  };

  render() {
    const {
      title, toggle, children, confirmBtnTxt, cancelBtnTxt
    } = this.props;
    const attributes = omit(this.props, propsToOmit);

    return (
      <Modal className="confirm-modal" toggle={toggle} modalTransition={{ timeout: 150 }} {...attributes}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className="text-center">{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onConfirmClick}>{confirmBtnTxt}</Button>
          <Button color="secondary" onClick={this.onCancelClick}>{cancelBtnTxt}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmModal.defaultProps = defaultProps;
ConfirmModal.propTypes = propTypes;

export default ConfirmModal;
