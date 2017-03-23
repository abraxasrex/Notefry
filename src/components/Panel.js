import React from 'react';

const Panel = React.createClass({
  render() {
     let panelClasses = 'cal-panel ' + this.props.currentCal.type + '-cal-panel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
     let memoText;
     let memo = this.props.thisObj.memo || '';
          //   {/*onClick={() => this.props.select(this.props.propKey) }>*/}
    return (
      <div className={panelClasses}
        style={  (this.props.selected === this.props.propKey) ? {background: hilite, width: '75%', height: '100%', zIndex: '2px', position: 'absolute'} : {background: normal}}
        onClick={() => this.props.goToPanelView(this.props.currentCal.type, this.props.thisObj.time, this.props.propKey) }>
         {memo}
        <div className='littleBox' onClick={() => this.props.openModal(this.props.propKey)}>
          <button>+</button>
        </div>
        {(this.props.display || this.props.display == 0) || 'not set'}
      </div>
    );
  }
});

export default Panel;
