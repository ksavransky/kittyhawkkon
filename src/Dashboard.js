import React, { Component } from 'react';
import PilotCardWrapper from './PilotCardWrapper.js'
import BootstrapTable from 'react-bootstrap-table-next';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'


const columns = [
{
  dataField: 'id',
  text: 'Id'
},
{
  dataField: 'first_name',
  text: 'First Name'
},
{
  dataField: 'last_name',
  text: 'Last Name'
},
{
  dataField: 'email',
  text: 'Email'
},
];

const defaultSorted = [{
  dataField: 'id',
  order: 'desc'
}];

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedUserId: null
    }
  }

  onClick = (e, row, rowIndex) => {
    console.log(`clicked on row with id: ${row.id}`);
    this.setState({
      selectedUserId: row.id
    })
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className='dashboard'>
        <div className='title'>
          Pilots
        </div>
        <div className='content'>
          <div className='pilot-table'>
            <BootstrapTable
              keyField='id'
              striped
              hover
              condensed
              rowEvents={{
                onClick: this.onClick
              }}
              defaultSorted={ defaultSorted }
              data={ this.props.users }
              columns={ columns } />
            </div>
            <div className='pilot-card-container'>
              {this.state.selectedUserId &&
                <PilotCardWrapper pilotId={this.state.selectedUserId} />
              }
            </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
