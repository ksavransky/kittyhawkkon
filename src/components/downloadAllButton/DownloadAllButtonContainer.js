import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loader from 'react-loader-spinner'
import DownloadAllButton from './DownloadAllButton.js'

const DownloadAllButtonContainer = () => (
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
      if (loading) return (
        <div className='cvs-button disabled'>
          <Loader
            containerClass='loader'
            type="Oval"
            color="#00BFFF"
            height="15"
            width="15"
          />
          <div className='text'>Export All</div>
        </div>
      )
      if (error) return <p>Error :(</p>
        
      return <DownloadAllButton data={data.account.users} />
    }}
  </Query>
);

export default DownloadAllButtonContainer;
