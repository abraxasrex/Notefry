import React from 'react';
// import logo from './logo.svg';
import './App.css';

const Nav = React.createClass ({
  something () {
    return {obj: 1};
  },
  render () {
    return <div className='nav-full'>
      <div className='nav-partial' style={{background: '#FFA07A'}}>Day</div>
      <div className='nav-partial' style={{background: '#FF7F50'}}>Week</div>
      <div className='nav-partial' style={{background: '#FF8C00'}}>Month</div>
      <div className='nav-partial' style={{background: '#FFA500'}}>Year</div>
    </div>
  }
});

const Panel = React.createClass({
  render() {
    return (
      <div className='panel-fluid'> I am a panel. current calendar is {this.props.currentCal || 'not set'} </div>
    );
  }
});

const Calendar = React.createClass({
  render() {
    return (
      <div> I am a calendar.
      <Panel currentCal={this.props.currentCal || 'not set'}/>
      </div>
    );
  }
});


const App = React.createClass({
  getInitialState() {
    return { currentCal: 'day'};
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1>Notifry</h1>
        <h5>New Note</h5>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <div className='app-container'>
          <Nav />
          <Calendar currentCal={this.state.currentCal} />
        </div>
      </div>
    );
  }
});

export default App;
