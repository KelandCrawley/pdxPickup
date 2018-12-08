import React, { Component } from 'react';
import queryString from 'query-string'
import { getLocationImg, formatTime } from './Utility'
import ActionButton from './ActionButton';
import '../Style/SessionShow.css';

class SessionShow extends Component {
    constructor(props){
      super(props);
      this.getSessionByID = this.getSessionByID.bind(this);
      this.state={
        session: 0,
        sessionID: 0,
      }
    }

    componentDidMount(){
        const values = queryString.parse(this.props.siteLocation.search);
        const sessionID = values.id;

        let session = this.getSessionByID(sessionID)
        this.setState({sessionID: sessionID});
        this.setState({session: session});
    }

    componentDidUpdate(){
        //if session has not been set and getSessionByID is finding then session set it
        if(this.state.session === 0){
            let session = this.getSessionByID(this.state.sessionID);
            if(session != 0){
                this.setState({session: session});
            }
            
  
        }
    }

    getSessionByID(_id){

        //look for it in sessions
        for(let i = 0; i < this.props.sessions.length; i++){
          if(this.props.sessions[i]._id == _id){
    
            return this.props.sessions[i];
          }
        }
    
        //if not found, return 0.
        //if sessions have been passed and still no session is found, may want to have site redirect and show an error instead
        return 0;
      }

    render() {

        //avoids errors if data hasnt loaded yet
        if(this.props.locations.length < 1 || this.state.session === 0){
            return(<div></div>)
        }

        return(
        <div key='z005' className="sessionShow">
            <div className="centerTitle"> { this.state.session.sessionName}  </div>
            <div className="row">
                <div className="sessionImg col-6">{getLocationImg(this.state.session.locationID, "160", "240")} </div>
                <div className="col-6">
                    <div className="centerDescendingText">{this.props.locations[this.state.session.locationID - 1].locationName} </div>
                    <div className="centerDescendingText">{this.props.locations[this.state.session.locationID - 1].locationAddress} </div>
                    <div className="centerDescendingText text-info"> {formatTime( this.state.session.sessionDate)} </div>
                    <div className="centerDescendingText text-secondary"> # of Players: { this.state.session.sessionPop} </div>
                </div>
            </div>
            <div className="SessionComment">{ this.state.session.sessionDescription}</div>
            <div className="centerBox">
                <ActionButton 
                    session={this.state.session} 
                    userEmail={this.props.userEmail}
                />
            </div>
        </div>
        )
    }

}

export default SessionShow;