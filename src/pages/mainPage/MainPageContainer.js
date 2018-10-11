import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import MainPage from './MainPage.js'

const MainPageContainer = () => (
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
              latitude
              longitude
              duration
              location {
                id
                name
                latitude
                longitude
              }
              notes
              batteries {
                id
                name
                manufacturer
                serial_number
              }
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
        <MainPage users={data.account.users} />
      )
    }}
  </Query>
);

export default MainPageContainer;
