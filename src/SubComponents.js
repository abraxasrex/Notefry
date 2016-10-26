import React from 'react';

const NavPill = React.createClass({
  render () {
    return <div className='nav-partial' style={this.props.style}
      onClick={() => this.props.setCal(this.props.pillName)}>
      {this.props.pillName}
    </div>
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
     let panelClasses = 'cal-panel ' + this.props.currentCal.type + '-cal-panel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
    return (
      <div className={panelClasses}
        style={  (this.props.selected === this.props.propKey) ? {background: hilite} : {background: normal}}
        onClick={() => this.props.select(this.props.propKey) } >
         {this.props.memoText || ''}
        <div className='littleBox' onClick={() => this.props.openModal(this.props.propKey)}>+</div>
        {this.props.time || 'not set'}
      </div>
    );
  }
});

// 0. take array of hours (done)
// User story:
// 1. calendar views render differently based on Day, Week, Month, and Months  (with year marker)

//rendering:
//1. get all hours six months from now  (done)
//2. generate Day view --> 1. get current Date and render name and number date, 2. have each hour Panel render hour name (hardcoded) and moments array memos results matching hour
//3. generate Week view --> have each day Panel 1. calculate last monday and next sunday, 2. render name of day (hardcoded) and memos matching that date
//4. generate Month view --> have each day Panel 1. find number of days in month and display them, 2. render moment array memos matching date
//5. generate Months view --> have each day Panel 1. generate month names between 'now' and 'then' objects,  2. get memos matching their respective month
//6. for Day and Week: Next and Back buttons should add or subtract the date or the week for their view  and repeat theri render process
export default {Nav: Nav, Panel: Panel}
