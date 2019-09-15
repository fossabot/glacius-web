import React from 'react';
import PropTypes from 'prop-types';
import {
  AppHeader, AppFooter, AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter
} from '@coreui/react';
import AppSidebarMinimizer from 'components/AppSidebarMinimizer';
import { Container } from 'reactstrap';
import * as router from 'react-router-dom'; /* eslint-disable-line import/no-duplicates */
import { renderRoutes } from 'react-router-config';
import { getSideBarOpt } from 'utils/localStorage';
import { navigation } from '../../navigation';
import Header from './Header';
import Footer from './Footer';

const propTypes = {
  route: PropTypes.object
};

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpt: getSideBarOpt()
    };
  }

  render() {
    const { route } = this.props;
    const { sidebarOpt: { isMinimized, isHidden } } = this.state;

    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed minimized={isMinimized} display={isHidden ? '' : 'lg'}>
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid className="pt-4 h-100">
              {renderRoutes(route.routes)}
            </Container>
          </main>
        </div>
        <AppFooter>
          <Footer />
        </AppFooter>
      </div>
    );
  }
}

Layout.propTypes = propTypes;

export default Layout;
