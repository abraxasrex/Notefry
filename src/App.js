import React from 'react';
// import logo from './logo.svg';
import './App.css';

const NavPill = React.createClass({
  render () {
    return <div className='nav-partial' style={this.props.style} onClick={() => this.props.setCal(this.props.pillName)}>{this.props.pillName}</div>
  }
});

const Nav = React.createClass ({
  render () {
    return <div className='nav-full'>
      <NavPill className='nav-partial' style={{background: '#FFA07A'}} pillName='Day' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FF7F50'}} pillName='Week' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FF8C00'}} pillName='Month' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FFA500'}} pillName='Year' setCal={this.props.setCal}/>
    </div>
  }
});

const Panel = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },
  select: function() {
    //this.setState({whichSelected: this.props.calName});
    this.setState({selected: !this.state.selected});
  },
  render() {
    let unpopped = 'cal-panel ' + this.props.currentCal + '-cal-panel';
    // let popped = 'cal-panel ' + this.props.currentCal + '-cal-panel popuppanel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
    //  if(this.state.whichSelected !== this.props.calName){
    //   // //this.state.selected = false;
    //   this.setState({selected: false});
    //  }
    return (
      <div className={unpopped}
      style={  this.state.selected ? {background: hilite} : {background: normal}}
      //  onClick={() => this.select() }>
      select={this.props.select}>
      {this.props.calName || 'not set'}
      {/* {this.props.cellLabel + 1} */}
      </div>
    );
  }
});

const Day = React.createClass({

});

const Week = React.createClass({

});

const Month = React.createClass({

});

const Year = React.createClass({

});

const Calendar = React.createClass({
  render() {
    /* bootstrap calendar */
    let calObjects =this.props.calObjects;
    let currentCal = this.props.currentCal;
    let calResults;
    if(currentCal == 'Day'){
      calResults = calObjects.Day.times;
    } else {
      calResults = calObjects[currentCal];
    }
    let calClass = 'cal-panel ' + currentCal + '-cal-panel';
    /* return panels */
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
      {/* I am a calendar. */}
        {
            calResults.map(function(obj, i){
              return <Panel className= 'panel-fluid' key={i + obj.name} currentCal={currentCal} calName={obj.name} cellLabel={i}/>
            })
        }

      </div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
        currentCal: 'Week',
        calCounts: [
          'Day': 24,
          'Week': 7,
          'Month': 30,
          'Year': 12
        ],
        calObjects: {
          Day: {
            times: [
              {name: '1AM', memos: []},
              {name: '2AM', memos: []},
              {name: '3AM', memos: []},
              {name: '4AM', memos: []},
              {name: '5AM', memos: []},
              {name: '6AM', memos: []},
              {name: '7AM', memos: []},
              {name: '8AM', memos: []},
              {name: '9AM', memos: []},
              {name: '10AM', memos: []},
              {name: '11AM', memos: []},
              {name: '12AM', memos: []},
              {name: '1PM', memos: []},
              {name: '2PM', memos: []},
              {name: '3PM', memos: []},
              {name: '4PM', memos: []},
              {name: '5PM', memos: []},
              {name: '6PM', memos: []},
              {name: '7PM', memos: []},
              {name: '8PM', memos: []},
              {name: '9PM', memos: []},
              {name: '10PM', memos: []},
              {name: '11PM', memos: []},
              {name: '12PM', memos: []}
            ]
          },
          Week: [
            {name: 'Monday', date: '', times: []},
            {name: 'Tuesday', date: '', times: []},
            {name: 'Wednesday', date: '', times: []},
            {name: 'Thursday', date: '', times: []},
            {name: 'Friday', date: '', times: []},
            {name: 'Saturday', date: '', times: []},
            {name: 'Sunday', date: '', times: []}
          ],
          Month: [
            {name:1,times:[]},
            {name:2,times:[]},
            {name:3,times:[]},
            {"name":4,"times":[]},
            {"name":5,"times":[]},
            {"name":6,"times":[]},
            {"name":7,"times":[]},
            {"name":8,"times":[]},
            {"name":9,"times":[]},
            {"name":10,"times":[]},
            {"name":11,"times":[]},
            {"name":12,"times":[]},
            {"name":13,"times":[]},
            {"name":14,"times":[]},
            {"name":15,"times":[]},
            {"name":16,"times":[]},
            {"name":17,"times":[]},
            {"name":18,"times":[]},
            {"name":19,"times":[]},
            {"name":20,"times":[]},
            {"name":21,"times":[]},
            {"name":22,"times":[]},
            {"name":23,"times":[]},
            {"name":24,"times":[]},
            {"name":25,"times":[]},
            {"name":26,"times":[]},
            {"name":27,"times":[]},
            {"name":28,"times":[]},
            {"name":29,"times":[]},
            {"name":30,"times":[]},
            {"name":31,"times":[]},
            {"name":'',"times":[]}
          ],
          Year: [
            {name: 'January', days: []},
            {name: 'February', days: []},
            {name: 'March', days: []},
            {name: 'April', days: []},
            {name: 'May', days: []},
            {name: 'June', days: []},
            {name: 'July', days: []},
            {name: 'August', days: []},
            {name: 'September', days: []},
            {name: 'October', days: []},
            {name: 'November', days: []},
            {name: 'December', days: []}
          ]
        }
    };
  },
  setCal (e) {
    this.setState({
      currentCal: e
    });
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1>Notifry</h1>
        <h5>New Note</h5>
        </div>
        <div className='app-container'>
          <Nav setCal={this.setCal} currentCal={this.state.currentCal}/>
          <Calendar currentCal={this.state.currentCal}
          calObjects={this.state.calObjects} />
        </div>
      </div>
    );
  }
});

export default App;
