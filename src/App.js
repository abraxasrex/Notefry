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
  render() {
    return (
      <div className='panel-fluid'> {this.props.currentCal || 'not set'}:{this.props.cellLabel + 1}</div>
    );
  }
});

const Calendar = React.createClass({
  render() {
    let calObjects =this.props.calObjects;
    let currentCal = this.props.currentCal;
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}> I am a calendar.
              {/* {objects.map(function(object, i){
            return <ObjectRow obj={object} key={i} />;
        })} */}
        {calObjects.map(function(obj, i){
          return <Panel className='cal-panel' key={i} currentCal={currentCal} cellLabel={i}/>
        })}

      </div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
        currentCal: 'Day',
        calCounts: [
          'Day': 24,
          'Week': 7,
          'Month': 30,
          'Year': 12
        ],
        calObjects: [
          {memos: [1]},
          {memos: [2]},
          {memos: [3]},
          {memos: [4]},
          {memos: [5]}
        ]
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
