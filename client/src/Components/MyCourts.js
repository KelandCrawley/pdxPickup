import React, { Component } from 'react';
import HomeCourt from './HomeCourt';
import Sessions from './Sessions';
import PostGame from './PostGame';
import '../Style/MyCourts.css';

class MyCourts extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setActiveTab(2);
  }

 render() {
    //if data not loaded, return empty div
    if(!this.props.sessions || !this.props.locations){
      return(<div></div>)
    }

    // ???
    let locationId = this.props.userSession[0].homeCourtlocationID;
    if(locationId == 0){
      locationId = 1;
    }

    return(
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <HomeCourt
            locations={this.props.locations}
            userSession={this.props.userSession[0]}
          />
          <div className="GamesHeader"> <h4>Your games</h4> </div>
            <Sessions LocationID={locationId} 
                sessionPopMin={0} 
                isLoggedIn={true}
                userEmail={this.props.userSession[0].userEmail}  
                dateRange={10000} 
                sessions={this.props.sessions} 
                locations={this.props.locations}
                alwaysShowUserGames={true}/>
        </div>
        <div className="col-6">
          <PostGame userSession={this.props.userSession} 
          locations={this.props.locations}/>
        </div>
      </div>
    </div>

     )
  }
}

export default MyCourts;
