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
      this.handleSessionDescriptionChange = this.handleSessionDescriptionChange.bind(this);
      this.getLocationNamesArray = this.getLocationNamesArray.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state ={
        sessionName: "Friendly Game!",
        parkLocation: 1,
        attendesInParty: 1,
        dateTime: Date,
        sessionDescription: "",
        locationNames: [],
      };
    }

    componentWillMount(){
      let locationNames =  this.getLocationNamesArray();
      this.setState({locationNames: locationNames});
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

    handleSessionDescriptionChange(sessionDescription){
      this.setState({sessionDescription: sessionDescription.target.value});
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

    return (

      //Post Game form
      <div>
        <h3 className="postGameHeader"> Post a game </h3>
          <div className="postForm"> 
            <form onSubmit={this.handleSubmit} action='/MyCourts'>
              <label>Game Name</label>
                <input className="form-control" type="text" value={this.state.sessionName} onChange={this.handleSessionNameChange} />
              <label>Location</label>
                <select className="form-control" value={this.props.parkLocation} onChange={this.handleParkLocationChange}>
                {this.state.locationNames.map((x,y) => <option key={"PG"+ y.toString()} value={y + 1}>{x}</option>)}
                </select>
              <label>How many players are you bringing?</label>
                <input className="form-control" type="number" value={this.state.attendesInParty} onChange={this.handleAttendesChange} step="any"  />
              <label for="exampleTextarea">Short Description</label>
                <textarea class="form-control" value={this.state.sessionDescription} onChange={this.handleSessionDescriptionChange} rows="3"></textarea>
              <DateTime input={ false } selected={this.state.dateTime} onChange={ this.handleDateTimeChange } />
              <div className="divider"></div>
              <button className="btn btn-primary">Post Game!</button>
          </form>
        </div>
      </div>
    );
  }
}


export default PostGame;