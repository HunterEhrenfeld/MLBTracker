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
    });
      const myData = [].concat(this.state.rowData)
          .sort((a, b) => a.best_sell_price > b.best_sell_price ? 1 : -1)
          .map((item, i) =>
              <div key={i}> {item.name} {item.best_sell_price}{item.best_buy_price}</div>
          );
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
                      </tr>
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
        </div>

    );
  }
}

export default App;
