import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";


const kittyHawkURL = 'http://api.kittyhawk.io/graphql?token=HWm0tPtem7oY2xJ8MBhPn7RpTTpXCaZF'

const client = new ApolloClient({
  uri: kittyHawkURL
});

const AppWithApolloClient = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithApolloClient />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
