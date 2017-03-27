import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
const Panel = React.createClass({
  render() {
     let panelClasses = 'cal-panel ' + this.props.currentCal.type + '-cal-panel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
     let memoText;
     let memo = this.props.thisObj.memo || '';
     let display = this.props.display;
     if(memo.length > 0){
       console.log(memo);
     }
          //   {/*onClick={() => this.props.select(this.props.propKey) }>*/}
          //        style={  (this.props.selected === this.props.propKey) ? {background: hilite, width: '75%', height: '100%', zIndex: '2px', position: 'absolute'} : {background: normal}}
//         <RaisedButton label={'Delete memo'} danger={true} onClick={() => this.props.openModal(this.props.propKey)} />

    return (
      <Card
      className={panelClasses}
        onClick={() => this.props.goToPanelView(this.props.currentCal.type, this.props.thisObj.time, this.props.propKey) }>

        <CardTitle title={this.props.display  || 'not set'}> </CardTitle>
      <CardText>  {memo} </CardText>
      <CardActions>
        <RaisedButton label={memo.length > 0 ? 'Edit Memo' : 'Add Memo'} primary={true} onClick={() => this.props.openModal(this.props.propKey)} />
       </CardActions>
      </Card>
    );
  }
});

export default Panel;
