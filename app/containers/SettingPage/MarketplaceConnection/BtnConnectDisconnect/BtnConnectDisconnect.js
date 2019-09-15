import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  isConnected: PropTypes.bool.isRequired,
  onDisconnectClick: PropTypes.func.isRequired,
  onConnectClick: PropTypes.func.isRequired
};

function BtnConnectDisconnect({ isConnected, onDisconnectClick, onConnectClick }) {
  if (isConnected) {
    return <Button color="danger" onClick={onDisconnectClick}>Disconnect</Button>;
  }

  return <Button color="secondary" onClick={onConnectClick}>Connect</Button>;
}

BtnConnectDisconnect.propTypes = propTypes;

export default BtnConnectDisconnect;
