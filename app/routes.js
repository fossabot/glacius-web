import React from 'react';
import { Redirect } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import App from './containers/App';
import DashboardPage from './containers/DashboardPage/Loadable';
import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage/Loadable';
import NotFoundPage from './containers/NotFoundPage/Loadable';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/portal',
        component: RequiredAuth(Layout),
        routes: [
          { path: '/portal', exact: true, component: function redirect() { return <Redirect to="/portal/dashboard" />; } },
          { path: '/portal/dashboard', component: DashboardPage },
          { path: '*', component: NotFoundPage }
        ]
      },
      { path: '/login', name: 'Login', component: RequiredAuth(LoginPage, false) },
      { path: '*', component: NotFoundPage }
    ]
  }
];

export default routes;
