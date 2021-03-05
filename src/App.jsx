import React from 'react';
import * as axios from 'axios';
import {Grid, Segment, Header} from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Name", field: "name"
      }, {
        headerName: "Best Sell Price", field: "best_sell_price"
      }, {
        headerName: "Best Buy Price", field: "best_buy_price"
      }],
      rowData: []
    }
  }

  getListings(query) {
    axios.get(`https://mlb20.theshow.com/apis/listings.json${query ? `?type=${query}` : ""}`)
    .then((response) => {
      this.setState({
        rowData: response.data
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
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <br />
              <Header>MLB The Show 20 Community Market Listings</Header>
              <Segment>
                <div 
                  className="ag-theme-balham"
                  style={{ 
                  height: '500px', 
                  width: '920px' }} 
                >
                  <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData.listings}>
                  </AgGridReact>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default App;