import React from 'react';
import * as axios from 'axios';
import Table from 'react-bootstrap/Table';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PopUp from './PopUp';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      rowData: [],
        page: [],
        totalPages: [],
        loading: true
    }
  }

  handleClick(e){
    alert("hi! this is " + e.listing_name);
    return (<Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

  <Modal.Body>
    <p>Modal body text goes here.</p>
  </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>);
  }

  async getAll(){
    var pageNo = 1;
    const r = await axios.get('https://mlb21.theshow.com/apis/listings.json')
    this.setState({
      rowData:[]
    });
    while (pageNo <= r.data.total_pages){
      await axios.get(`https://mlb21.theshow.com/apis/listings.json?page=${pageNo}`).then(res => { this.setState({
          loading:false,
          rowData: [...this.state.rowData.flat(), res.data.listings.flat()]
        }); })
      pageNo+=1;
      console.log(this.state.rowData);
    }
    this.setState({
      rowData: this.state.rowData.flat()
    });
    console.log(r.data.total_pages)
    console.log(this.state.rowData)

  }

  getListings(query) {
    axios.get(`https://mlb21.theshow.com/apis/listings.json${query ? `?page=${query}` : ""}`)
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
    this.setState({
      rowData: []
    });
    this.getAll();
    console.log(this.state.rowData)
  }

  render() {
    const useStyles = makeStyles((theme) => ({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }));
        //If Collecting Data, Display Loading Page
        if (this.state.loading) {
            return (
                <Backdrop style={useStyles} open>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )
        }
        else {
          return (
              <div>
                <Table striped bordered hover responsive size="sm" variant="dark">
                <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Sell</th>
                                <th>Buy</th>
                                <th>Margin</th>
                                <th>Margin Ratio</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.rowData.sort((a, b) => (((a.best_sell_price - a.best_buy_price) * 0.9)) < (((b.best_sell_price - b.best_buy_price) * 0.9)) ? -1 : 1)
                                .sort((a, b) => (((a.best_sell_price - a.best_buy_price) * 0.9)/a.best_buy_price) < (((b.best_sell_price - b.best_buy_price) * 0.9)/b.best_buy_price) ? 1 : -1)
                                .filter(function(x) {
                                  return x.best_buy_price !== undefined;
                                }).map(
                                    row =>
                                        <tr key={row.item.uuid}>
                                            <td><PopUp row={row}/></td>
                                            <td>{row.listing_name}</td>
                                            <td>{row.best_sell_price}</td>
                                            <td>{row.best_buy_price}</td>
                                            <td>{(row.best_sell_price - row.best_buy_price) * 0.9}</td>
                                            <td>{((row.best_sell_price - row.best_buy_price) * 0.9)/row.best_buy_price}</td>
                                        </tr> )
                            }
                            </tbody>
                </Table>
                
              </div>
          );
        }
  }
}

export default App;
