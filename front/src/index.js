import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Global.css';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://d48ae8f8a29f454a8263e92fed809e07@o478156.ingest.sentry.io/5520251",
    integrations: [
      new Integrations.BrowserTracing(),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
