import React, { Component } from 'react';
import '../Style/Browse.css';

class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handlePopMinChange = this.handlePopMinChange.bind(this);
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
    const location = this.props.parkLocation;
    const popMin = this.props.sessionPopMin;
    const dateRange = this.props.dateRange;
    let locationNames = [];
    //load locaiton names into an array from locations data
      if(this.props.locations)
      {
        for(let i = 0; i < this.props.locations.length; i++)
        {
          locationNames.push(this.props.locations[i].locationName);
        }
      }
    return (
      <div>
        <form>
          <div>
            <label>Location </label>
            <select className="form-control" value={location} onChange={this.handleLocationChange}>
              <option value="0">Any Location</option>
              {locationNames.map((x,y) => <option key={y} value={y + 1}>{x}</option>)}
            </select>
              <label> Date Range </label>
              <select className="form-control" value={dateRange} onChange={this.handleDateRangeChange}>
                <option value="10000">Any</option>
                <option value="1">Today</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select>
            <label>Minimum attendes </label>
            <input className="form-control" type="number" value={popMin} onChange={this.handlePopMinChange} step="any"  />
          </div>
        </form>
      </div>
    );
  }
}

export default BrowseForm;