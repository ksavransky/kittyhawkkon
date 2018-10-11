import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loader from 'react-loader-spinner'
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
      if (loading) return (
        <Loader
          type="Oval"
          color="#00BFFF"
          height="70"
          width="70"
          className='main-page-loader'
        />
      )
      if (error) return <p>Error :(</p>;

      return (
        <MainPage users={data.account.users} />
      )
    }}
  </Query>
);

export default MainPageContainer;
