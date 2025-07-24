import React from 'react';
import Layout from './features/layout-feature';
import ProtectedRoute from './core/components/ProtectedRoute';

import Home from './features/home';
import ButtonsView from './features/buttons';
import CardsView from './features/cards';
import ModalsView from './features/modals'; 
import AlertsView from './features/alerts';
import CountersView from './features/counters';
import NotFound from './features/not-found';

import LandingPage from './features/landing-feature';
import LoginPage from './features/login';
import RegisterPage from './features/register';

const routes = [
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: '/components',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'buttons', element: <ButtonsView /> },
      { path: 'cards', element: <CardsView /> },
      { path: 'modals', element: <ModalsView /> }, 
      { path: 'alerts', element: <AlertsView /> },
      { path: 'counters', element: <CountersView /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;