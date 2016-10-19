import React from 'react';
// import logo from './logo.svg';
import './App.css';

const NavPill = React.createClass({
  render () {
    return <div className='nav-partial' onClick={() => this.props.setCal(this.props.pillName)}>{this.props.pillName}</div>
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
  setCal (e) {
    //e.preventDefault();
    this.setState({
      currentCal: e
    });
  },
  render() {
    //this.setCal = this.setCal.bind(this);
    return (
      <div className="App">
        <div className="App-header">
        <h1>Notifry</h1>
        <h5>New Note</h5>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <div className='app-container'>
          <Nav setCal={this.setCal}/>
          <Calendar currentCal={this.state.currentCal} />
        </div>
      </div>
    );
  }
});

export default App;
