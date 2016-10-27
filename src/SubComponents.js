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

const Calendar = React.createClass({
  render() {
   let calProps = this.props;
   let calObjects = calProps.calendarObjects;
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
        {
            calObjects.map(function(obj, i){
              return <Panel className='panel-fluid' key={obj.time} propKey={obj.time}
              currentCal={calProps.currentCal}
              display ={obj.display}
              selected={calProps.selected}
              select={calProps.select}
              openModal={calProps.openModal}
              thisObj={obj} />
            })
       }
      </div>
    );
  }
});

const Panel = React.createClass({
  render() {
     let panelClasses = 'cal-panel ' + this.props.currentCal.type + '-cal-panel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
     let memoText;
     let memos = this.props.thisObj.memos;
     memos.length ? (memoText = memos.reduce(function(a, b){return a +  ', ' + b;})) : (memoText = '');
    return (
      <div className={panelClasses}
        style={  (this.props.selected === this.props.propKey) ? {background: hilite} : {background: normal}}
        onClick={() => this.props.select(this.props.propKey) }
         >
         {memoText}
        <div className='littleBox' onClick={() => this.props.openModal(this.props.propKey)}>+</div>
        {(this.props.display || this.props.display == 0) || 'not set'}
      </div>
    );
  }
});

export default {Nav: Nav, Calendar: Calendar}
