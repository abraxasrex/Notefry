import React from 'react';
import NavPill from './NavPill.js';

//    <NavPill className='nav-partial' style={{background: '#FFA07A'}} pillName='Day' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FF7F50'}} pillName='Week' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FF8C00'}} pillName='Month' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FFA500'}}
const Nav = React.createClass ({
  render () {
    return <div className='nav-full'>
      <NavPill className='nav-partial' pillName='Day' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' pillName='Week' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' pillName='Month' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' pillName='Year' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    </div>
  }
});

export default Nav;
