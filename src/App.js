import React from 'react';
import * as axios from 'axios';
import Table from 'react-bootstrap/Table';


class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      rowData: [],
        page: [],
        totalPages: []
    }
  }

  async getAll(){
    var pageNo = 1;
    const r = await axios.get('https://mlb20.theshow.com/apis/listings.json')
    while (pageNo <= r.data.total_pages){
      const request = await axios.get(`https://mlb20.theshow.com/apis/listings.json?page=${pageNo}`);
      this.setState({
          rowData: [...this.state.rowData.flat(), request.data.listings.flat()]
        });
      pageNo+=1
    }
    this.setState({
      rowData: this.state.rowData.flat()
    });
    console.log(r.data.total_pages)
    console.log(this.state.rowData)

  }

  getListings(query) {
    axios.get(`https://mlb20.theshow.com/apis/listings.json${query ? `?page=${query}` : ""}`)
    .then((response) => {
      this.setState({
        // rowData: response.data.listings,
          // page: response.data.page,
          totalPages: response.data.total_pages
      })
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(this.state.totalPages)

  }

  componentDidMount () {
    this.getAll();
    console.log(this.state.rowData)
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
                                      <td>{(row.best_sell_price - row.best_buy_price) * 0.9}</td>
                                  </tr> )
                      }
                      </tbody>
          </Table>
           
        </div>
    );
  }
}

export default App;
