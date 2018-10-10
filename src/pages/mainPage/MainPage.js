import React, { Component } from 'react';
import PilotCardContainer from '../../components/pilotCard/PilotCardContainer.js'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'

const { ExportCSVButton } = CSVExport;

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
}
];

const defaultSorted = [{
  dataField: 'id',
  order: 'desc'
}];

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedUserId: null
    }
  }

  handleOnClick = (e, row, rowIndex) => {
    this.setState({
      selectedUserId: row.id
    })
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='title'>
          Pilots
        </div>
        <div className='content'>
          <ToolkitProvider
            keyField="id"
            data={ this.props.users }
            columns={ columns }
            exportCSV
          >
            {
              props => (
                <div className='pilot-table-container'>
                  <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                  <div className='pilot-table'>
                    <BootstrapTable
                      { ...props.baseProps }
                      defaultSorted={ defaultSorted }
                      striped
                      hover
                      condensed
                      rowEvents={{
                        onClick: this.handleOnClick
                      }}
                    />
                  </div>
                </div>
              )
            }
          </ToolkitProvider>
            <div className='pilot-card-container'>
              {this.state.selectedUserId ?
                <PilotCardContainer pilotId={this.state.selectedUserId} /> :
                <div className="pilot-card">
                  <div className="pilot-title">Pilot Information</div>
                  <div className="pilot-message">Click on a Row</div>
                </div>
              }
            </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
