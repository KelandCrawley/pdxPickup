import React, { Component } from 'react';
import DateTime from 'react-datetime';
import fetch from 'cross-fetch';
import '../Style/datePicker.css';

class PostGame extends Component {
   constructor(props){
      super(props);
      this.handleParkLocationChange = this.handleParkLocationChange.bind(this);
      this.handleAttendesChange = this.handleAttendesChange.bind(this);
      this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
      this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state ={
        sessionName: "Friendly Game!",
        parkLocation: 1,
        attendesInParty: 1,
        dateTime: Date,
        userEmail: this.props.userSession[0].userEmail
      };
    }

    handleSubmit(event) {
      let data = this.state;
      const today = new Date();
      if(this.state.dateTime >= today)
      {
        fetch('/api/sessions', {
          method: 'post',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
    }

    handleDateTimeChange(newDateTime) {
      this.setState({ dateTime: newDateTime });
    }

    handleParkLocationChange(newParkLocation){
      this.setState({parkLocation: newParkLocation.target.value});
    }

     handleSessionNameChange(newName){
      this.setState({sessionName: newName.target.value});
    }

    handleAttendesChange(newAttendesInParty){
      this.setState({attendesInParty: newAttendesInParty.target.value});
    }

    getLocationNamesArray(){
      let locationNames = [];
      if(this.props.locations){
        for(let i = 0; i < this.props.locations.length; i++)
        {
          locationNames.push(this.props.locations[i].locationName);
        }
      }
      return locationNames;
    }


  render() {
      let locationNames = getLocationNamesArray();

    return (

      //Post Game form
      <div>
        <h3 className="postGame-Header"> Post a game </h3>
          <div className="postForm"> 
            <form onSubmit={this.handleSubmit} action='/MyCourts'>
              <label>Game Name</label>
              <input className="form-control" type="text" value={this.state.sessionName} onChange={this.handleSessionNameChange} />
              <label>Location</label>
              <select className="form-control" value={this.props.parkLocation} onChange={this.handleParkLocationChange}>
                {locationNames.map((x,y) => <option key={y} value={y + 1}>{x}</option>)}
              </select>
              <label>How many players are you bringing?</label>
              <input className="form-control" type="number" value={this.state.attendesInParty} onChange={this.handleAttendesChange} step="any"  />
              <DateTime input={ false } selected={this.state.dateTime} onChange={ this.handleDateTimeChange } />
              <button className="btn btn-primary">Post Game!</button>
          </form>
        </div>
      </div>
    );
  }
}


export default PostGame;