import React from 'react';
import PropTypes from 'prop-types';
import {
  AppHeader, AppFooter, AppSidebar, AppSidebarHeader, AppSidebarForm, AppSidebarNav, AppSidebarFooter, AppSidebarMinimizer
} from '@coreui/react';
import { Container } from 'reactstrap';
import * as router from 'react-router-dom'; /* eslint-disable-line import/no-duplicates */
import { renderRoutes } from 'react-router-config';
import { navigation } from '../../navigation';
import Header from './Header';
import Footer from './Footer';

const propTypes = {
  route: PropTypes.object
};

class Layout extends React.PureComponent {
  render() {
    const { route } = this.props;

    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
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
