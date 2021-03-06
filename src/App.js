import React from 'react';
import * as axios from 'axios';
import {Grid, Segment, Header} from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Table from 'react-bootstrap/Table';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      rowData: []
    }
  }

  getListings(query) {
    axios.get(`https://mlb20.theshow.com/apis/listings.json${query ? `?type=${query}` : ""}`)
    .then((response) => {
      this.setState({
        rowData: response.data.listings
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    this.getListings();
  }

  render() {
    return (
        <div>
          <Table striped bordered hover responsive size="sm" variant="dark">
          <thead>
                      <tr>
                          <th>Name</th>
                          <th>Sell</th>
                          <th>Buy</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          this.state.rowData.map(
                              row =>
                                  <tr>
                                      <td>{row.name}</td>
                                      <td>{row.best_sell_price}</td>
                                      <td>{row.best_buy_price}</td>
                                  </tr> )
                      }
                      </tbody>
          </Table>
        </div>

    );
  }
}

export default App;
