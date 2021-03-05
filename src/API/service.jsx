import axios from 'axios'

class service{
  fetchListings(){
    return axios.get("https://mlb20.theshow.com/apis/listings.json")
  }
}

export default new service();