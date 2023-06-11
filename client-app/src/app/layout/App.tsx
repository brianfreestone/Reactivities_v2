import React, { Fragment } from 'react';
import './App.css'
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';

function App() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <Navbar />
          <Container className='activity-container'>
            <Outlet />
          </Container>
        </>
      )}

    </>
  );
}

export default observer(App);
