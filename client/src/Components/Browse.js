import React, { Component } from 'react';
import Session from './Sessions'
import BrowseForm from './BrowseForm'
import '../Style/Browse.css';


class Browse extends Component {
    constructor(props){
      super(props);
      this.handleParkLocationChange = this.handleParkLocationChange.bind(this);
      this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
      this.handleSessionPopMinimumChange = this.handleSessionPopMinimumChange.bind(this);
      this.state ={
        parkLocation: 0,
        sessionPopMin: 0,
        dateRange: 10000,
      };
    }

    handleParkLocationChange(parkLocation){
      this.setState({parkLocation});
    }
    handleDateRangeChange(dateRange){
      this.setState({dateRange});
    }

    handleSessionPopMinimumChange(sessionPopMin){
      this.setState({sessionPopMin});
    }

  render() {
    const parkLocation = this.state.parkLocation;
    const sessionPopMin = this.state.sessionPopMin;
    const dateRange = this.state.dateRange;
    return (

      <div>
        <div className="Browse-Ui"> 
          <BrowseForm parkLocation={parkLocation}
            onLocationChange={this.handleParkLocationChange} 
            sessionPopMin={sessionPopMin} 
            onSessionPopMinChange={this.handleSessionPopMinimumChange}
            onDateRangeChange={this.handleDateRangeChange} 
            locations={this.props.locations}/>
        </div>

        <Session LocationID={parkLocation} 
          sessionPopMin={sessionPopMin} 
          isLoggedIn={this.props.isLoggedIn}
          userEmail={this.props.userEmail}  
          dateRange={dateRange} 
          sessions={this.props.sessions} 
          locations={this.props.locations}/>
      </div>
    );
  };
};

export default Browse;

