import React, { Component } from 'react';
import PilotCard from './PilotCard'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PilotCardWrapper = (props) => (

  <Query
    query={gql`
      {
        account {
          users (id: ${props.pilotId}) {
            first_name
            last_name
            email
            flights {
              id
              duration
              aircraft {
                id
                manufacturer
                model
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
        <PilotCard data={data.account.users[0]} />
      )
    }}
  </Query>
)

export default PilotCardWrapper;
