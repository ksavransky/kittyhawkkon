import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const kittyHawkURL = 'http://api.kittyhawk.io/graphql?token=HWm0tPtem7oY2xJ8MBhPn7RpTTpXCaZF'

const link = createHttpLink({ uri: kittyHawkURL, fetchOptions: {method: 'POST'}});


const client = new ApolloClient({
  link: link,
  uri: kittyHawkURL
});

client
  .query({
    query: gql`
      {
         account {
           users {
             id
           }
         }
       }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
