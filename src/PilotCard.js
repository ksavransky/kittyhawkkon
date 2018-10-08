import React, { Component } from 'react';
import moment from 'moment'
import { forEach, map } from 'lodash'
import './PilotCard.css'

class PilotCard extends Component {
  constructor(props) {
    super(props)
    this.totalFlightTime = null
    this.flightsPerAirCraft = null

    this.state = {
      pilot: this.props
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      pilot: nextProps
    })
  }

  getTotalFlightInformation = (pilotData) => {
    let totalDuration = 0
    let perAircraftData = {}
    pilotData.flights.forEach((flight) => {
      totalDuration += flight.duration
      let aircraft = flight.aircraft
      if (aircraft) {
        let totalDurationPerAircraft = perAircraftData[aircraft.manufacturer + '|' + aircraft.model]
        if (totalDurationPerAircraft) {
          perAircraftData[aircraft.manufacturer + '|' + aircraft.model] = totalDurationPerAircraft += flight.duration
        } else {
          perAircraftData[aircraft.manufacturer + '|' + aircraft.model] = flight.duration
        }
      }
    })
    forEach(perAircraftData, (value, key) => {
      perAircraftData[key] = moment.duration((value * 1000))
    })

    totalDuration = moment.duration((totalDuration * 1000));

    return {totalDuration: totalDuration, perAircraftData: perAircraftData}
  }

  render() {
    if (!this.state.pilot){
      return null
    }

    const pilotData = this.state.pilot.data
    this.flightInformation = this.getTotalFlightInformation(pilotData)
    const totalFlightTime = this.flightInformation.totalDuration._data
    const perAircraftData = this.flightInformation.perAircraftData

    return (
      <div className="pilot-card">
        <div className="pilot-title">Pilot Information</div>
        <div className="name">{pilotData.first_name + ' ' + pilotData.last_name}</div>
        <div className="email">{'Email: ' + pilotData.email}</div>
        <div className="total-flights">{'Total Flights: ' + pilotData.flights.length}</div>
        <div className="total-flight-time">{'Total Flight Time: ' +
          totalFlightTime.days + ' days ' +
          totalFlightTime.hours + ' hours ' +
          totalFlightTime.minutes + ' minutes'
          }
        </div>
        <div className="aircrafts">
          <div className="aircrafts-title">Aircrafts Total Flight Times</div>
          {map(perAircraftData, (duration, name) => {
            duration = duration._data
            return (
              <div className="aircraft-container">
                <div className='name'>{name.replace('|', ' ')}</div>
                <div className="total-flight-time">{'Total Flight Time: ' +
                  duration.days + ' days ' +
                  duration.hours + ' hours ' +
                  duration.minutes + ' minutes'
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default PilotCard;
