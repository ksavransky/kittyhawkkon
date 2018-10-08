import React, { Component } from 'react';
import moment from 'moment'

class PilotCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pilot: this.props
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      pilot: nextProps
    })
  }

  getTotalFlightDuration = (pilotData) => {
    console.log('getTotalFlightDuration', pilotData)
    let duration = 0
    pilotData.flights.forEach((flight) => {
      duration += flight.duration
    })
    let newDuration = moment.duration((duration * 1000));
    console.log('newDuration', newDuration)
    return newDuration
  }


  render() {
    console.log('this.props in PilotCard', this.props)
    console.log('this.props in PilotCard', this.state)
    if (!this.state.pilot){
      return null
    }

    const pilotData = this.state.pilot.data
    const totalFlightTime = this.getTotalFlightDuration(pilotData)._data

    return (
      <div className="pilot-card">
        <div className="name">{'Name: '+ pilotData.first_name + ' ' + pilotData.last_name}</div>
        <div className="email">{'Email: ' + pilotData.email}</div>
        <div className="total-flights">{'Total Flights: ' + pilotData.flights.length}</div>
        <div className="total-flight-time">{'Total Flight Time: ' +
          totalFlightTime.days + ' days, ' +
          totalFlightTime.hours + ' hours, ' +
          totalFlightTime.minutes + ' minutes.'
          }
        </div>
        <div className="aircrafts"></div>
      </div>
    );
  }
}

export default PilotCard;
