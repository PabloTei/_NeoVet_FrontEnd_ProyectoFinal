import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import NeovetContextProvider from './context/neovetContext';
import EditClientProfile from './pages/EditClientProfile/EditClientProfile';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Pets from './pages/Pets/Pets';
import Staff from './pages/Staff/Staff';
import UserClients from './pages/UserClients/UserClients';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <NeovetContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/userclients" element={<UserClients />} />
            <Route path="/editprofile" element={<EditClientProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </NeovetContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
