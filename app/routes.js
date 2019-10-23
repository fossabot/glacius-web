import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import App from './containers/App';
import DashboardPage from './containers/DashboardPage/Loadable';
import ProductPage from './containers/ProductPage';
import SettingPage from './containers/SettingPage';
import ShowProduct from './containers/ProductPage/ShowProduct/Loadable';
import ShowOrder from './containers/OrderPage/ShowOrder/Loadable';
import ShowCustomer from './containers/CustomerPage/ShowCustomer/Loadable';
import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage/Loadable';
import NotFoundPage from './containers/NotFoundPage/Loadable';
import AddEditProduct from './containers/ProductPage/AddEditProduct/Loadable';
import RegisterPage from './containers/RegisterPage/Loadable';
import withEmailVerified from './hoc/withEmailVerified';
import withUserShop from './hoc/withUserShop';
import withAuth from './hoc/withAuth';
import ChangePassword from './containers/SettingPage/ChangePassword/Loadable';
import { MarketplaceConnection, NotificationConnection } from './containers/SettingPage/Connections';
import { EasystoreSetting, ShopifySetting, WoocommerceSetting } from './containers/SettingPage/Marketplaces';
import OrderPage from './containers/OrderPage';
import CustomerPage from './containers/CustomerPage';
import SocialLoginCallbackPage from './containers/SocialLoginCallbackPage/Loadable';

/* eslint-disable react/display-name */
function redirect(to) {
  return (props) => <Redirect {...props} to={to} />;
}

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/portal',
        component: compose(withAuth, withEmailVerified, withUserShop)(Layout),
        routes: [
          { path: '/portal', exact: true, component: redirect('/portal/dashboard') },
          { path: '/portal/dashboard', exact: true, component: DashboardPage },
          {
            path: '/portal/products',
            component: ProductPage,
            routes: [
              { path: '/portal/products', exact: true, component: ShowProduct },
              { path: '/portal/products/add', exact: true, render: (props) => <AddEditProduct {...props} mode="Add" /> },
              { path: '/portal/products/edit/:id', exact: true, render: (props) => <AddEditProduct {...props} mode="Edit" /> },
              { path: '*', component: NotFoundPage }
            ]
          },
          {
            path: '/portal/orders',
            component: OrderPage,
            routes: [
              { path: '/portal/orders', exact: true, component: ShowOrder },
              { path: '*', component: NotFoundPage }
            ]
          },
          {
            path: '/portal/customers',
            component: CustomerPage,
            routes: [
              { path: '/portal/customers', exact: true, component: ShowCustomer },
              { path: '*', component: NotFoundPage }
            ]
          },
          {
            path: '/portal/account',
            component: SettingPage,
            routes: [
              { path: '/portal/account/password', exact: true, component: ChangePassword },
              { path: '/portal/account/marketplace-connections', exact: true, component: MarketplaceConnection },
              { path: '/portal/account/notification-connections', exact: true, component: NotificationConnection },
              { path: '/portal/account/easystore-setting', exact: true, component: EasystoreSetting },
              { path: '/portal/account/shopify-setting', exact: true, component: ShopifySetting },
              { path: '/portal/account/woocommerce-setting', exact: true, component: WoocommerceSetting },
            ]
          },
          { path: '*', component: NotFoundPage }
        ]
      },
      {
        path: '/login/:socialProvider/callback',
        exact: true,
        render: (props) => {
          const WithAuth = withAuth(SocialLoginCallbackPage);
          return <WithAuth {...props} authRequired={false} />;
        }
      },
      {
        path: '/login',
        render: (props) => {
          const WithAuth = withAuth(LoginPage);
          return <WithAuth {...props} authRequired={false} />;
        }
      },
      { path: '/register', component: RegisterPage },
      { path: '*', component: NotFoundPage }
    ]
  }
];
/* eslint-enable react/display-name */

export default routes;
