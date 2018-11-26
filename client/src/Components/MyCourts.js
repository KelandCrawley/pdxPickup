import React, { Component } from 'react';
import fetch from 'cross-fetch';
import SessionBox from './SessionBox';
import PostGame from './PostGame';
import '../Style/Sessions.css';



class MyCourts extends Component {
   // Initialize the state
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSelectCourt = this.handleSelectCourt.bind(this);
    this.state ={
      userEmail: this.props.userSession[0].userEmail,
      homeCourt: 0,
    }
  }

  handleLocationChange(event) {
      this.setState({homeCourt: event.target.value});
  }

  handleDelete(event){
    let data = this.props.sessions[event.target.value];
    fetch('/api/sessions/delete', {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  handleSelectCourt(event){
    let data = [];
    data.push(this.state.homeCourt);
    fetch('/api/users/homecourt', {
      method: 'put',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  handleRemove(event){
    let data = [];
    data.push(this.props.sessions[event.target.value]);
    data.push(this.state.userEmail);
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

 render() {
      //in data not loaded, dont render
      if(!this.props.sessions || !this.props.locations){
          return(<div></div>)
      }

      const homeCourt = [];
      const rows = [];
      let locationNames = [];

      //load location names from locatons, makes for easy mapping
      if(this.props.locations){
        for(let i = 0; i < this.props.locations.length; i++){
          locationNames.push(this.props.locations[i].locationName);
        }
      }

      // check if user has a home court selected, 0 value is default no home court
      // if no home court, give option to set homecourt
      // else: display user homecourt with a button to edit
      if(this.props.userSession[0].homeCourtlocationID < 1){
        homeCourt.push(<div className="homeCourt">select a home court! 
          <div>
            <form>
              <select className="form-control" value={this.state.homeCourt} onChange={this.handleLocationChange}>
              {locationNames.map((x,y) => <option key={y} value={y + 1}>{x}</option>)} </select>
            </form>
            <button className="btn btn-info btn-sm" 
            onClick={this.handleSelectCourt} value={this.state.homeCourt} >Select</button>
          </div>
        </div>);
      }
      else{
        if(this.props.sessions && this.props.locations){
          homeCourt.push(<div key="mc103" className="homeCourt"><span>Your home court is {<div className="sessionLocation">{this.props.locations[this.props.userSession[0].homeCourtlocationID - 1].locationName} </div>} </span>
          <span><button className="btn btn-info btn-sm"
           onClick={this.handleSelectCourt} value={0} > Edit</button></span>
          </div>);
        }
      } 

      //sessions setup
      for(let i = 0; i < this.props.sessions.length; i++){

        const userAction = [];
        //additional info/action based on user-session relationship
        if(this.props.sessions[i].locationID === this.props.userSession[0].homeCourtlocationID){ // game on user home court
          userAction.push(<span className="session-action"> <button className="btn btn-danger btn-sm"
           onClick={this.handleDelete} value={i} >Delete! </button></span>)
        }
        else if(this.props.sessions[i].sessionOwnerEmail === this.state.userEmail){ //user owned game
          userAction.push(<span className="session-action"> <button className="btn btn-danger btn-sm"
           onClick={this.handleDelete} value={i} >Delete! </button></span>)
        }
        else if (this.props.sessions[i].sessionAttendes.indexOf(this.state.userEmail) > -1){ //game user is attending
          userAction.push(<span className="session-action"> <button className="btn btn-secondary btn-sm"
            onClick={this.handleRemove} value={i} >un-Attend! </button></span>)
        }
        else{
          continue; //don't display sessions that no user-session relationship
        }

        //sessionBox  
        rows.push(<div key="mc104" className="row-small col-6">{userAction[0]}<SessionBox locationID={this.props.sessions[i].locationID} keyValue={i}
        sessions={this.props.sessions} locations={this.props.locations}/></div>) 

      }
    return(
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6"> {homeCourt}
          <div className="divider"> Your Other Games </div>
          {rows}
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
