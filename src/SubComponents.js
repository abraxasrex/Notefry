import React from 'react';

const NavPill = React.createClass({
  render () {
    // let currentCal = this.props.currentCal;
    return <div className='nav-partial' style={this.props.style}
      onClick={() => this.props.setCal(this.props.pillName, this.props.currentCal.start, this.props.currentCal.title)}>
      {this.props.pillName}
    </div>
  }
});

const Nav = React.createClass ({
  render () {
    return <div className='nav-full'>
      <NavPill className='nav-partial' style={{background: '#FFA07A'}} pillName='Day' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' style={{background: '#FF7F50'}} pillName='Week' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' style={{background: '#FF8C00'}} pillName='Month' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
      <NavPill className='nav-partial' style={{background: '#FFA500'}} pillName='Year' setCal={this.props.setCal} currentCal={this.props.currentCal}/>
    </div>
  }
});

const Calendar = React.createClass({
  render() {
   let calProps = this.props;
   let calObjects = calProps.calendarObjects;
    return (
      <div className='cal-super-container'>
        <div className='cal-title'>
          <div className='cycle'><i className="fa fa-arrow-left" aria-hidden="true" onClick={this.props.lastCalView}></i></div>
          {/* <h5 className='calTitleText'>{()=> new Date(calProps.currentCal.title)}</h5> */}
              <h5 className='calTitleText'>{calProps.currentCal.title}</h5>
          <div className='cycle'><i className="fa fa-arrow-right" aria-hidden="true" onClick={this.props.nextCalView}></i></div>
        </div>
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
        style={  (this.props.selected === this.props.propKey) ? {background: hilite, width: '75%', height: '100%', zIndex: '2px', position: 'absolute'} : {background: normal}}
        onClick={() => this.props.select(this.props.propKey) }>
         {memoText}
        <div className='littleBox' onClick={() => this.props.openModal(this.props.propKey)}>+</div>
        {(this.props.display || this.props.display == 0) || 'not set'}
      </div>
    );
  }
});

export default {Nav: Nav, Calendar: Calendar}
