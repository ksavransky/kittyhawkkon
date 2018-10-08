import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard.js'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Users = () => (
  <Query
    query={gql`
      {
        account {
          users {
            id
            first_name
            last_name
            email
            flights {
              id
              duration
              aircraft {
                id
                name
                manufacturer
                model
                serial_number
              }
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <Dashboard users={data.account.users} />
      )
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Users />
      </div>
    );
  }
}

export default App;
