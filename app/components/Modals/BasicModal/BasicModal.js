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
  confirmBtnColor: 'primary',
  onConfirm: () => {},
};

const propTypes = {
  title: PropTypes.string,
  confirmBtnTxt: PropTypes.string,
  confirmBtnColor: PropTypes.string,
  closeOnConfirmClick: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  bodyClassName: PropTypes.string
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
      title, toggle, children, confirmBtnTxt, confirmBtnColor, bodyClassName
    } = this.props;
    const attributes = omit(this.props, propsToOmit);

    return (
      <Modal className="basic-modal" toggle={toggle} modalTransition={{ timeout: 150 }} {...attributes}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className={bodyClassName}>{children}</ModalBody>
        <ModalFooter>
          <Button color={confirmBtnColor} onClick={this.onConfirmClick}>{confirmBtnTxt}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

BasicModal.defaultProps = defaultProps;
BasicModal.propTypes = propTypes;

export default BasicModal;
