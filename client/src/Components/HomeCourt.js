import React, { Component } from 'react';
import '../Style/MyCourts.css';

class HomeCourt extends Component {
    constructor(props){
        super(props);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSelectCourt = this.handleSelectCourt.bind(this);
        this.state ={
          homeCourt: 0,
        }
      }
   
      
       handleLocationChange(event) {
           this.setState({homeCourt: event.target.value});
       }
   
       //updates the users homecourt on the server
       handleSelectCourt(event){
           let data = [];
            data.push(event.target.value);
           fetch('/api/users/homecourt', {
               method: 'put',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
           });
           window.location.reload();     
       }
   
       render(){
           
           const homeCourt = [];
           let locationNames = [];
   
           //load location names from locatons, makes for easy mapping
           if(this.props.locations){
               locationNames = this.props.locations.map(loc => loc.locationName);
           }
           
           // check if user has a home court selected, 0 value is default no home court
           // if no home court, give option to set homecourt
           // else: display user homecourt with a button to edit
           if(this.props.userSession.homeCourtlocationID < 1){
               homeCourt.push(
               <div className="homeCourt"><h4>select a home court! </h4>
                   <div>
                       <form>
                       <select className="form-control" value={this.state.homeCourt} onChange={this.handleLocationChange}>
                       {locationNames.map((x,y) => <option key={"MC"+ y.toString()} value={y + 1}>{x}</option>)} </select>
                       <button className="btn btn-info btn-sm" 
                       onClick={this.handleSelectCourt} value={this.state.homeCourt} >Select</button>
                       </form>
                   </div>
               </div>);
           }
           else {
               homeCourt.push(<div key="MC103" className="homeCourt">
               <h4>Your home court is </h4>
               <h4>
                   <div className="homeCourtName">{this.props.locations[this.props.userSession.homeCourtlocationID - 1].locationName} 
                   <button className="btn btn-info btn-sm" onClick={this.handleSelectCourt} value={0} >Edit</button>
                   </div> 
               </h4>
               </div>);
           } 
        return(<div>
           {homeCourt}
        </div>

            );
    }
}
export default HomeCourt;