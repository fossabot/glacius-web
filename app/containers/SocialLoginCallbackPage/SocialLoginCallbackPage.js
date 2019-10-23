import React from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';

const propTypes = {
  match: PropTypes.object,
  queryString: PropTypes.any,
  loginWithToken: PropTypes.func,
  navigateToPortalPage: PropTypes.func,
  navigateToLoginPage: PropTypes.func,
};

class SocialLoginCallbackPage extends React.PureComponent {
  componentDidMount() {
    this.sendOauthCallbackParamsToServer();
  }

  sendOauthCallbackParamsToServer = async () => {
    const {
      match: { params: { socialProvider } }, queryString, loginWithToken, navigateToPortalPage, navigateToLoginPage
    } = this.props;

    try {
      // forward all callback params to server
      const res = await request({
        url: `/user/login/${socialProvider}/callback`,
        method: 'POST',
        data: { ...queryString }
      });

      if (res && res.token) {
        loginWithToken(res.token);
        return navigateToPortalPage();
      }

      return navigateToLoginPage();
    } catch (e) {
      return navigateToLoginPage();
    }
  };

  render() {
    return null;
  }
}

SocialLoginCallbackPage.propTypes = propTypes;

export default SocialLoginCallbackPage;
