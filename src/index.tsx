import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// import { Auth0Provider } from '@auth0/auth0-react'
import { AuthProvider } from '../src/contexts/auth.js'
import { Buffer } from 'buffer';
global.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    {/* domain="poopgarden.us.auth0.com"
    clientId="vrntEffO3h8OTsDZDiguYx4yzbEDNyVt"
    redirectUri={window.location.origin}
  > */}
      <App />
    </AuthProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
