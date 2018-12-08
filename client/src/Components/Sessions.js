import React, { Component } from 'react';
import SessionBox from './SessionBox';


class Sessions extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.filterSessions = this.filterSessions.bind(this);
    this.checkForDateRange = this.checkForDateRange.bind(this);
    this.state = {
      filtertedList: [],
    }
  }

  checkForDateRange(session){
    //set up variables
    const today = new Date();
    const range = new Date();
    const sessionDate = new Date(session.sessionDate);

    //set range to be today plus the number of days passed in
    range.setDate(range.getDate() + parseInt(this.props.dateRange));

    //check if sessionDate is not past and that its before the end of range
    if(sessionDate.getTime() >= today.getTime() && sessionDate.getTime() <= range.getTime() ){
      return true;
    }
    return false;
  }

  filterSessions(){

    const selectedSearchLocID = parseInt(this.props.LocationID, 10);
    let filterList = this.state.filtertedList;

    //Filter out sessions that dont meet one of the two conditions
    filterList = this.props.sessions.filter(session => (
      //condition 1: the session is within search parameters
      (session.sessionPop >= this.props.sessionPopMin
        && this.checkForDateRange(session) 
        && (selectedSearchLocID === 0 || selectedSearchLocID === session.locationID)
      ) ||
      //condition 2: the always show users games flag is true and user is involved in the game
      (this.props.alwaysShowUserGames === true 
        && ((session.sessionAttendes.indexOf(this.props.userEmail) > -1) || session.sessionOwnerEmail === this.props.userEmail)
      )
      ));

      //further filter sessions if a search by name value is given
    if(this.props.nameSearchQuery){
      if(this.props.nameSearchQuery != ""){
        filterList = filterList.filter(session => (
          session.sessionName.toLowerCase().indexOf(this.props.nameSearchQuery.toLowerCase()) > -1
        )); 
      }
    }  

      this.state.filtertedList = filterList;
  }

  render() {

    //filter sessions
    this.filterSessions();
    let sessionBoxes = [];

    //allow for passing a max display number
    let displayMax = this.state.filtertedList.length;
    if(this.props.maxSessions){
      displayMax = Math.min(this.props.maxSessions, displayMax); 
    }
 

    for(let i = 0; i < displayMax; i++){
      sessionBoxes.push(
        <div>
          <SessionBox 
            locationID={this.state.filtertedList[i].locationID} 
            keyValue={"SE"+ i.toString()}
            session={this.state.filtertedList[i]} 
            locations={this.props.locations}
            userEmail={this.props.userEmail}
          />
      </div>
      )
    }
    
    return (
    <div>
      {sessionBoxes}
    </div>
    );
  }
}

export default Sessions;