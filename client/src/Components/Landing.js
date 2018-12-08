import React, { Component } from 'react';
import Sessions from './Sessions'
import '../Style/Landing.css';

class Landing extends Component {
	constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setActiveTab(0);
  }

  render() {
  	const siteInfo = [];
    const LandingLeft = [];
  	const LandingRight = [];

  	//site info banner
  	siteInfo.push(<div key="b006" className="siteInfo"><h1>Welcome To PDX Pickup!</h1> </div>)
    

    // left side, upcoming games
    LandingLeft.push(
      <div key="b007" className="quickGamesList">
        <h2> Upcoming Games </h2> 
      </div>
    );

    //right side, site info
    LandingRight.push(
      <div key="b005" className="aboutText">
        <h4><div>This site is for demonstrative purposes only!</div>
          <div> None of the games on this site are real!</div> 
          <div>
           Feel free to sign in with google and post fake data and/or test the site. 
          Send any feedback to kelandcrawley@yahoo.com. 
          </div>
        </h4>
      </div>
    );
    		

    return (
    	<div className="container">
        {siteInfo}
        <div className="row">
          <div className="col-sm-12 col-md-6">
            {LandingLeft}
            <Sessions LocationID={0} 
              sessionPopMin={0} 
              userEmail={this.props.userEmail}  
              dateRange={10000} 
              sessions={this.props.sessions} 
              locations={this.props.locations}
              maxSessions={3}
              alwaysShowUserGames={true}/>
          </div>
          <div className="col-sm-12 col-md-6">
            {LandingRight}  
          </div>
      </div>
    </div>  
    );
  }
}

export default Landing;

