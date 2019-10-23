import React from 'react';
import { Button } from 'reactstrap';
import request from 'utils/request';
import './style.scss';

const redirectToGoogleOAuth = async () => {
  const res = await request({
    url: '/user/login/google',
    method: 'POST',
  });

  window.location = res.url;
};

function ButtonLoginWithGoogle() {
  return (
    <Button block color="danger" className="btn-google-login mb-0" onClick={redirectToGoogleOAuth}>
      <i className="fab fa-google" /><strong>Google</strong>
    </Button>
  );
}

export default ButtonLoginWithGoogle;
