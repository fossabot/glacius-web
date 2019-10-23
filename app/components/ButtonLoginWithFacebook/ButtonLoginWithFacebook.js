import React from 'react';
import { Button } from 'reactstrap';
import request from 'utils/request';
import './style.scss';

const redirectToFacebookOAuth = async () => {
  const res = await request({
    url: '/user/login/facebook',
    method: 'POST',
  });

  window.location = res.url;
};

function ButtonLoginWithFacebook() {
  return (
    <Button block color="primary" className="btn-facebook-login mb-0" onClick={redirectToFacebookOAuth}>
      <i className="fab fa-facebook-f" /><strong>Facebook</strong>
    </Button>
  );
}

export default ButtonLoginWithFacebook;
