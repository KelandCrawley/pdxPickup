import React, { Component } from 'react';
import Sessions from './Sessions'
import BrowseForm from './BrowseForm'
import '../Style/Browse.css';


class Browse extends Component {
    constructor(props){
      super(props);
      this.handleParkLocationChange = this.handleParkLocationChange.bind(this);
      this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
      this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
      this.handleSessionPopMinimumChange = this.handleSessionPopMinimumChange.bind(this);
      this.state ={
        parkLocation: 0,
        sessionPopMin: 0,
        dateRange: 10000,
        sessionName: "",
      };
    }
    handleSessionNameChange(sessionName){
      this.setState({sessionName});
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

  componentDidMount(){
    this.props.setActiveTab(1);
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4"> 
            <div className=" leftFix">
              <BrowseForm parkLocation={this.state.parkLocation}
                onLocationChange={this.handleParkLocationChange} 
                sessionPopMin={this.state.sessionPopMin} 
                onSessionPopMinChange={this.handleSessionPopMinimumChange}
                onDateRangeChange={this.handleDateRangeChange} 
                onSessionNameChange={this.handleSessionNameChange} 
                sessionName={this.state.sessionName}
                locations={this.props.locations}
              />
            </div>   
          </div>
          <div className="col-sm-12 col-md-6">
              <Sessions LocationID={this.state.parkLocation} 
                sessionPopMin={this.state.sessionPopMin} 
                userEmail={this.props.userEmail}  
                dateRange={this.state.dateRange} 
                sessions={this.props.sessions} 
                locations={this.props.locations}
                nameSearchQuery={this.state.sessionName}
                alwaysShowUserGames={false}
              />
            </div>
        </div>
      </div>
    );
  };
};

export default Browse;

