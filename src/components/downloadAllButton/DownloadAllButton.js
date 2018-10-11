import React from 'react';
import { CSVLink } from 'react-csv';
import { forEach } from 'lodash'

const DownloadAllButton = ({ data }) => {
  const cvsData = []
  forEach(data, (pilot) => {
    const { id, first_name, last_name, email } = pilot
    cvsData.push({
      id,
      first_name,
      last_name,
      email
    })
    forEach(pilot.flights, (flight) => {
      const dataObject = {
        id,
        first_name,
        last_name,
        email,
        flightId: flight.id,
        flightDuration: flight.duration,
        flightNotes: flight.notes,
        flightLatitude: flight.latitude,
        flightLongitude: flight.longitude,
      }
      if (flight.location) {
        dataObject.flightLocationId = flight.location.id
        dataObject.flightLocationName = flight.location.name
      }
      if (flight.aircraft) {
        dataObject.flightAirCraftId = flight.aircraft.id
        dataObject.flightAirCraftManufacturer = flight.aircraft.manufacturer
        dataObject.flightAirCraftModel= flight.aircraft.model
        dataObject.flightAirCraftName = flight.aircraft.name
        dataObject.flightAirCraftSerialNumber = flight.aircraft.serial_number
      }
      if (flight.batteries) {
        dataObject.flightBatteriesName = flight.batteries.name
        dataObject.flightBatteriesManufacturer = flight.batteries.manufacturer
        dataObject.flightBatteriesSerialNumber = flight.batteries.serial_number
      }
      cvsData.push(dataObject)
    })
  })
  return (
    <CSVLink
      className='cvs-button'
      data={cvsData}
    >Export All</CSVLink>
  )
}

export default DownloadAllButton;
