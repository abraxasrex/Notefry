import React from 'react';
import NavPill from './NavPill.js';

//    <NavPill className='nav-partial' style={{background: '#FFA07A'}} pillName='Day' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FF7F50'}} pillName='Week' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FF8C00'}} pillName='Month' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    // <NavPill className='nav-partial' style={{background: '#FFA500'}}
    import {
      blue500,
      blue700,
      blueGrey100,
      blueGrey500,
      darkBlack,
      grey300,
      lightBlack,
      purpleA200,
      white,
      yellow300,
      indigo500,
      orange300,
      lightBlue500,
      pink300,
      lime300
    } from 'material-ui/styles/colors';

const Nav = React.createClass ({
  render () {
    return <div className='nav-full'>
      <NavPill bgColor={{color: lime300}} className='nav-partial' pillName='Day' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill bgColor={{color: yellow300}} className='nav-partial' pillName='Week' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill bgColor={{color: pink300}} className='nav-partial' pillName='Month' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill bgColor={{color: orange300}} className='nav-partial' pillName='Year' style={{width: '20%'}} setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    </div>
  }
});

export default Nav;
