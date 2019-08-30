import React from 'react';
import { Redirect } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import App from './containers/App';
import DashboardPage from './containers/DashboardPage/Loadable';
import ProductPage from './containers/ProductPage';
import ShowProduct from './containers/ProductPage/ShowProduct/Loadable';
import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage/Loadable';
import NotFoundPage from './containers/NotFoundPage/Loadable';
import AddEditProduct from './containers/ProductPage/AddEditProduct/Loadable';

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
        component: RequiredAuth(Layout),
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
          { path: '*', component: NotFoundPage }
        ]
      },
      { path: '/login', name: 'Login', component: RequiredAuth(LoginPage, false) },
      { path: '*', component: NotFoundPage }
    ]
  }
];
/* eslint-enable react/display-name */

export default routes;
