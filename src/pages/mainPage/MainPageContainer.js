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
