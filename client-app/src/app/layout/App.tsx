import React, { Fragment } from 'react';
import './App.css'
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import {ToastContainer} from 'react-toastify'

function App() {

  const location = useLocation();

  return (
    <>
    <ToastContainer position ='bottom-right' hideProgressBar theme='colored' />
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
