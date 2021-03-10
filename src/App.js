import React from 'react';
import * as axios from 'axios';
import {Grid, Segment, Header} from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      rowData: [],
        page: [],
        totalPages: []
    }
  }

  getListings(query) {
    axios.get(`https://mlb20.theshow.com/apis/listings.json${query ? `?page=${query}` : ""}`)
    .then((response) => {
      this.setState({
        rowData: response.data.listings,
          page: response.data.page,
          totalPages: response.data.total_pages
      })
    })
    .catch((err) => {
      console.log(err);
    });
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
                          <th>Margin</th>
                      </tr>(a,b)
                      </thead>
                      <tbody>
                      {
                          this.state.rowData.sort((a, b) => (a.best_sell_price - a.best_buy_price) < (b.best_sell_price - b.best_buy_price) ? 1 : -1).map(
                              row =>
                                  <tr>
                                      <td>{row.name}</td>
                                      <td>{row.best_sell_price}</td>
                                      <td>{row.best_buy_price}</td>
                                      <td>{row.best_sell_price - row.best_buy_price}</td>
                                  </tr> )
                      }
                      </tbody>
          </Table>
            <Button disabled={this.state.page===1} variant="primary" onClick={this.getListings.bind(this, this.state.page - 1)}>Prev</Button>
            <Button disabled={this.state.page+1===this.state.totalPages} variant="primary" onClick={this.getListings.bind(this, this.state.page + 1)}>Next</Button>
        </div>
    );
  }
}

export default App;
