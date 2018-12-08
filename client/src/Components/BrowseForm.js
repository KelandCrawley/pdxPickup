import React, { Component } from 'react';
import '../Style/Browse.css';

class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handlePopMinChange = this.handlePopMinChange.bind(this);
    this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
  }

  handleSessionNameChange(event) {
    this.props.onSessionNameChange(event.target.value);
  }

  handleLocationChange(event) {
    this.props.onLocationChange(event.target.value);
  }

  handleDateRangeChange(event) {
    this.props.onDateRangeChange(event.target.value);
  }


  handlePopMinChange(event){
  this.props.onSessionPopMinChange(event.target.value);
  }

  render() {

    let locationNames = [];
    //load locaiton names into an array from locations data
      if(this.props.locations){
        locationNames = this.props.locations.map(loc => loc.locationName);
      }
    return (
      <div>
        <form>
          <div>
          <label>Name Of Session</label>
            <input className="form-control" type="text" value={this.props.sessionName} onChange={this.handleSessionNameChange} />
            <label>Location </label>
            <select className="form-control" value={this.props.parkLocation} onChange={this.handleLocationChange}>
              <option value="0">Any Location</option>
              {locationNames.map((x,y) => <option key={"BF"+ y.toString()} value={y + 1}>{x}</option>)}
            </select>
              <label> Date Range </label>
              <select className="form-control" value={this.props.dateRange} onChange={this.handleDateRangeChange}>
                <option value="10000">Any</option>
                <option value="1">Today</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select>
            <label>Minimum attendes </label>
            <input className="form-control" type="number" value={this.props.sessionPopMin} onChange={this.handlePopMinChange} step="any"  />
          </div>
        </form>
      </div>
    );
  }
}

export default BrowseForm;