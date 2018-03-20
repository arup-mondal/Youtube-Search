import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      q:'',
      maxResults:5,
      searchData : []
    }
    this.handleChange.bind(this);
    this.handleClick.bind(this);
  }
  
  handleChange = (e) => {
    //console.log(e.target);
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  handleClick = (e) => {
    e.preventDefault();
    var state = this.state;
    this.setState({
      isLoading:true
    })
    //console.log(state);
    const queryData = {
      url:'https://www.googleapis.com/youtube/v3/search',
      part:'snippet',
      q:state.q,
      key:'AIzaSyCjB1zwd6iMrM78n_7nynh1TVjbIzOfBoc',
      maxResults:state.maxResults
    }

    fetch(`${queryData.url}?part=${queryData.part}&q=${queryData.q}&key=${queryData.key}&maxResults=${queryData.maxResults}`)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.setState({
        searchData:responseJson.items,
        isLoading:false,
      })
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading:false,
      })
    });
  }
  render() {
    let videos = this.state.searchData.map(function(video,index){
      //console.log(video);
      return(
        <div className="col-md-6" key={video.id.videoId}>
            <div className="card">
                <div className="card-image">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="card-content">
                    <span className="card-title">{video.snippet.title}</span>                    
                </div>
            </div>
        </div>
      )
    })
    return (
      <div className="container">
        <div class="jumbotron">
          <h1>Search Youtube Videos</h1> 
          <p>A simple React JS application to search for youtube videos.</p> 
        </div>
        {this.state.isLoading &&
          <div className="hasLoader">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        }
        <div className="row">
          <div className="col-lg-3">
            <div className="well">
              <form className="form-horizontal">
                <div className="form-group">
                  <label  className="control-label">Records</label>
                  <select className="form-control" name="maxResults" value={this.state.maxResults} onChange={this.handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="pricefrom" className="control-label">Search Query</label>
                  <div className="input-group">
                    <input type="text" className="form-control" aria-describedby="basic-addon1" value={this.state.q} name="q" onChange={this.handleChange} />
                  </div>
                </div>
                <button className="btn btn-info" onClick={this.handleClick}>Search</button>
              </form>
            </div>
          </div>
          <div className="col-lg-9 row">
            {videos}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
