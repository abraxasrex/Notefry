import React from 'react';
import Panel from './Panel.js';


const Calendar = React.createClass({
  render() {
   let calProps = this.props;
   let calObjects = calProps.calendarObjects;
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
        {
            calObjects.map(function(obj, i){
              //console.log(obj);
              return <Panel className='panel-fluid' key={obj.time} propKey={obj.time}
              currentCal={calProps.currentCal}
              display ={obj.display}
              selected={calProps.selected}
              select={calProps.select}
              openModal={calProps.openModal}
              thisObj={obj}
              goToPanelView={calProps.goToPanelView} />
            })
       }
      </div>
    );
  }
});

export default Calendar;
