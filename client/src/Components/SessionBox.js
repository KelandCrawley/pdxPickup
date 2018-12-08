import React, { Component } from 'react';
import ActionButton from './ActionButton';
import { getLocationImg, formatTime } from './Utility'
import '../Style/SessionBox.css';


class SessionBox extends Component {
      constructor(props){
        super(props);
        this.handleSessionBoxClick = this.handleSessionBoxClick.bind(this);
      }

  handleSessionBoxClick(){
    window.location.href= 'Browse/' + this.props.session.sessionName + '?id=' + this.props.session._id;
  }

  render() {
    return (

      <div className="sessionBox col-6" key={this.props.keyValue} onClick={this.handleSessionBoxClick}>
        <div className="sessionImg">{getLocationImg(this.props.locationID)} </div>
        <span className="sessionInfo">
          <div className="sessionName"> {this.props.session.sessionName}  </div>
          <div className="sessionLocation text-primary">{this.props.locations[this.props.locationID - 1].locationName} </div>
          <div className="sessionDate text-info"> {formatTime(this.props.session.sessionDate)} </div>
        </span>
        <span className="sessionPop text-secondary"> # of Players: {this.props.session.sessionPop} </span>

        <div className="topPad">
          <ActionButton 
            session={this.props.session} 
            userEmail={this.props.userEmail}
          />
          </div>
      </div>
    );
  }
}

export default SessionBox;
