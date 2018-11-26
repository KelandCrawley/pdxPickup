import React, { Component } from 'react';
import fetch from 'cross-fetch';
import SessionBox from './SessionBox';
import Moment from 'react-moment';
import '../Style/Sessions.css';


class Sessions extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.checkForDateRange = this.checkForDateRange.bind(this);
    this.state = {
    }
  }

  handleButton(event){
    if(this.props.isLoggedIn){
      //tell server to add user to session
      let data = [];
      data.push(this.props.sessions[event.target.value]);
      data.push(this.props.userEmail);
      console.log(JSON.stringify(data));

      fetch('/api/sessions/add', {
        method: 'put',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
      });
    window.location.reload();
    }
  }

  handleRemove(event){
    let data = [];
    data.push(this.props.sessions[event.target.value]);
    data.push(this.props.userEmail);
    fetch('/api/sessions/remove', {
      method: 'put',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  checkForDateRange(session){
    const today = new Date();
    const range = new Date();
    const sessionDate = new Date(session.sessionDate);
    range.setDate(range.getDate() + parseInt(this.props.dateRange));

    if(sessionDate.getTime() >= today.getTime() && sessionDate.getTime() <= range.getTime() ){
      return true;
    }
    return false;
  }


  render() {
    const rows = [];

    //don't display anything if data hasnt loaded yet
    if(!this.props.sessions || !this.props.locations){
      return(<div></div>)
    }

    for(let i = 0; i < this.props.sessions.length; i++){

      if(parseInt(this.props.LocationID) === 0 || parseInt(this.props.LocationID, 10) === this.props.sessions[i].locationID){
        
        //only render games that fit in search paramters
        if(this.props.sessions[i].sessionPop >= this.props.sessionPopMin&& this.checkForDateRange(this.props.sessions[i])){
          const userAction = [];

          //additional info/action based on user-session relationship
          if(this.props.isLoggedIn){
            //check if user owned game
            if(this.props.userEmail === this.props.sessions[i].sessionOwnerEmail){
              userAction.push(<div className="session-action text-success"> Your running this game!</div>)
            } //check if user is attending game
            else if(this.props.sessions[i].sessionAttendes.indexOf(this.props.userEmail) > -1){ //user attending game
              userAction.push(
                <div className=" session-action"> 
                  <button className="btn btn-secondary btn-sm" 
                  onClick={this.handleRemove} value={i}> un-Attend! </button>
                </div>
              )
            }
            else{ // else give user button to attend game
              userAction.push(
                <div className="session-action"> 
                  <button className="btn btn-success btn-sm" onClick={this.handleButton} value={i}> Attend! </button>
                </div>)
                }
          }

          //sessionBox  
          rows.push(
            <div className="row-small col-6">
              {userAction[0]}<SessionBox locationID={this.props.sessions[i].locationID} keyValue={i}
              sessions={this.props.sessions} locations={this.props.locations}/>
            </div>)
        }
      }
    }
    return (
      <div>
        <div className="container-fluid">
            <div className="col">
              {rows}
          </div>
        </div>
      </div>
    );
  }
}

export default Sessions;