import React from 'react';
import Panel from './Panel.js';
import Paper from 'material-ui/Paper';


const Calendar = React.createClass({
  render() {
   let calProps = this.props;
   let calObjects = calProps.calendarObjects;
    return (
      <Paper className='cal-container' style={{background:'#F0FFFF'}} zDepth={2}>
        {
            calObjects.map(function(obj, i){
              //console.log(obj);
              return <Panel
              key={obj.time} propKey={obj.time}
              currentCal={calProps.currentCal}
              display ={obj.display}
              displayFormat ={calProps.displayFormat}
              selected={calProps.selected}
              select={calProps.select}
              openModal={calProps.openModal}
              thisObj={obj}
              goToPanelView={calProps.goToPanelView} />
            })
       }
      </Paper>
    );
  }
});

export default Calendar;
