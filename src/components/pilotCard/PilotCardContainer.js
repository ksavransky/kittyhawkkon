import React from 'react'
import PilotCard from './PilotCard'
import Loader from 'react-loader-spinner'
import { Query } from "react-apollo"
import gql from "graphql-tag"

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
      if (loading) return (
        <Loader
          type="Oval"
          color="#00BFFF"
          height="50"
          width="50"
        />
      )
      if (error) return <p>Error :(</p>;

      return (
        <PilotCard data={data.account.users[0]} />
      )
    }}
  </Query>
)

export default PilotCardWrapper
