import React, { Component } from 'react';
import SessionBox from './SessionBox';

class Landing extends Component {
	constructor(props){
    super(props);
    this.state ={
    }
  }

  render() {
  	const siteInfo = [];
    const LandingLeft = [];
  	const LandingRight = [];

  	//site info banner
  	siteInfo.push(<div key="b006" className="siteInfo"><h1>Welcome To PDX Pickup!</h1> </div>)
    

    // left side, upcoming games

    if(this.props.sessions && this.props.locations){
      LandingLeft.push(
        <div key="b007" className="quickGamesList">
          <h2> Upcoming Games </h2> 
        </div>
      );

      //create up to 3 session boxes
      for(let i = 0; i < this.props.sessions.length && i < 3; i++) {
        LandingLeft.push(
          <div key="b008" className="row-small col-6">
            <SessionBox 
            locationID={this.props.sessions[i].locationID} keyValue={i}
            sessions={this.props.sessions} locations={this.props.locations}
            />
          </div>
        ) 
      }
    }

    //right side, site info
    LandingRight.push(
      <div key="b005" className="aboutText text-primary">
        <span className="important"><div>This site is currently for demonstrative purposes only!</div>
          <div> None of the games on this site are real!</div> 
        </span>
        <span> Feel free to sign in with google and post fake data and/or test the site. 
          Send any feedback to kelandcrawley@yahoo.com. 
        </span>
      </div>
    );
    		

    return (
    	<div>
    	  {siteInfo}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              {LandingLeft}
            </div>
            <div className="col-6">
              {LandingRight}  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

