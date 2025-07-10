import React from 'react';
import Layout from './features/layout-feature';

import Home from './features/home';
import ButtonsView from './features/buttons';
import CardsView from './features/cards';
import ModalsView from './features/modals'; 
import AlertsView from './features/alerts';
import CountersView from './features/counters';
import NotFound from './features/not-found';

import LandingPage from './features/landing-feature';

const routes = [
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: '/components',
    element: <Layout />,
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