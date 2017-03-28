import React from 'react';
import Modal from 'react-modal';
import update from 'immutability-helper';
import annyang from 'annyang';
import Moment from 'moment';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Nav from './Nav.js';
import Calendar from './Calendar.js';
import Bootstrap from '../Bootstrap.js';
import TextField from 'material-ui/TextField';

import '../css/App.css';
import popUpStyles from './styles.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DateRange from 'material-ui/svg-icons/action/date-range';
import Dialog from 'material-ui/Dialog';
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
  teal300,
  yellow500,
  indigo500,
  orange500,
  lightBlue500,
} from 'material-ui/styles/colors';
injectTapEventPlugin();
// import getDayView from './lib.js';

//require('node-jsx').install({extension: '.jsx'});
//import AppComponentTemplate from './AppComponentTemplate.jsx';
//import AppRenderer from './AppRenderer.js';

// const SpeechSynthesis = (
//   window.webkitSpeechSynthesis
// );

 class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
    this.props.openModal();
    };

  handleClose = () => {
    this.setState({open: false});
    this.props.closeModal();
  };
  constructor = () =>{
    this.openNoteMsg = this.props.openNoteMsg;
    this.changeOpenMsg = this.props.changeOpenMsg;
    this.changeOpenId = this.props.changeOpenId;
    this.openNoteId = this.props.openNoteId;
    this.submitMemo = this.props.submitMemo;
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          <h2> New Note: </h2>
              <form>
                <label>note msg:</label>
                <br />
                <textarea onChange={this.changeOpenMsg} value={this.state.openNoteMsg || ''} ></textarea>
                <br />
                <label>date:</label>
                <input onChange={this.changeOpenId} value={this.state.openNoteId}/>
                <br />
                <button onClick={this.submitMemo}>Save your memo</button>
              </form>
        </Dialog>
      </div>
    );
  }
}

// <Modal
//   isOpen={this.state.modalIsOpen}
//   onRequestClose={this.closeModal}
//   style={popUpStyles}
//   contentLabel="Example Modal">
//     <button onClick={this.closeModal}>close</button>
// </Modal>

let openModal, closeModal, saveMemo;

const App = React.createClass({
 getDayView(start){
   let _start = this.state.currentCal.start;
   if(start){
     _start = start;
   }
   var today = _start.getDay();
   var date = _start.getDate();
   var month = _start.getMonth();
   var year = _start.getYear();
   let hourObjs = [];
   for( let i = 0; i < 24; i++ ){
     let _memo;
     if(this.state.memos.length){
       this.state.memos.forEach(function(memo){
         if(memo.time.getHours() == i &&
         memo.time.getDate() === date && memo.time.getMonth() === month){
           _memo = memo.text;
         }
       });
     }
   //  let displayTime = Moment(new Date(year, month, date, i));
     hourObjs.push({
       //TODO momentify panel display
       display: Moment(new Date(year, month, date, i)).format('hh:mm a'),
       time: new Date(year, month, date, i),
       memo: _memo
     });
   }
     return hourObjs;
 },
  getWeekView(start){
    let today = new Date(this.state.currentCal.start);
    if(start){
      today = new Date(start);
    }
    var weekDays = [];
    for(var i = 0; i < 7; i++){
      let _memo;
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === today.getDate()
          && memo.time.getMonth() === today.getMonth()){
            _memo = memo.text;
          }
        });
      }
      let formatDate =  Moment(today, "YYYY-MM-DD HH:mm:ss");
      weekDays.push({
          //TODO momentify panel display
        display: Moment(formatDate).format('dddd') + ' ' + parseInt(today.getMonth() + 1) + '/' + parseInt(today.getDate()),
        time: new Date(today.getYear(), today.getMonth(), today.getDate()),
        memo: _memo
      });
      today = Moment(today).add(1, 'day').toDate();
    }
    return weekDays;
  },
  getMonthView(start){
    var monthDays = [];
    let today = new Date(this.state.currentCal.start);
    if(start){
      today = new Date(start);
    }
    var dayCount = Moment(this.state.currentCal.start).daysInMonth();
    today = new Date(today.getYear(), today.getMonth(), 1);

    for(let i = 1; i < dayCount + 1; i++){
      let _memo;
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === i && memo.time.getMonth() === today.getMonth()){
             _memo = memo.text;
            // console.log('pushed');
          }
        });
      }
      monthDays.push({
        //TODO momentify
        display: parseInt(today.getMonth() + 1) + '/' + parseInt(today.getDate()),
        time: new Date(today),
        memo: _memo
      });
      today = new Moment(today).add(1, 'day').toDate();
    }
      return monthDays;
  },
  getYearView(start){
    var yearMonths = [];
    var month = this.state.currentCal.start;
    if(start){
      month = start;
    }
    for(let i = 0; i < 12; i++){
      let _memo;
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getMonth() === month.getMonth()){
            _memo = memo.text;
          }
        });
      }
      yearMonths.push({
        //momentify
      //  display: month.getMonth() + 1,
      display: Moment(month).format('MMMM YYYY'),
        time: new Date(month.getYear(), month.getMonth(), month.getDay()),
        memos: _memo
      });
      month = Moment(month).add(1, 'month').toDate();
    }
     return yearMonths;
  },
  getInitialState()  {
    //localstorage check will go here
    openModal = this.openModal;
    closeModal = this.closeModal;
    saveMemo = this.saveMemo;

    let memos = [];
    return { currentCal: {start: new Date(), type: 'Day'},
    calendarObjects: [],
      modalIsOpen: false,
      openNoteId: '',
      openNoteMsg: null,
      listening: false,
      memos: memos
    };
  },
  watchTime(){

    let findMemo = (currentTime) =>{
      let found = false;
       if(this.state.memos.length){
         this.state.memos.forEach(function(memo){
           console.log(memo.time.getHours() + currentTime.getHours());
            if(memo.time.getHours() == currentTime.getHours() &&
              memo.time.getDate() == currentTime.getDate() &&
              memo.time.getMonth() == currentTime.getMonth()
            ){
              console.log('found!');
              found = memo.text;
            }
         });
         if(!!found){
           return found;
         }
       }
       return false;
    }

    let checkForTime = ()=> {
      let _now = new Date();
      let calTime = this.state.currentCal.start;
      let templateString = Moment(_now).format('MMMM Do YYYY, h:mm a');
      let memoFound = false;
      if(calTime != _now || calTime < _now){
      //  this.setCal(this.state.currentCal.type, _now);
        memoFound = findMemo(_now);
        if(!!memoFound){
          templateString += ". It is time to " + memoFound;
          this.setCal('Day', _now);
        }
        alert(` The time is ${ templateString }`);
      }
    }
    // 360000 ms === 1 hr
    setInterval(checkForTime, 360000);
  },
  componentWillMount(){
    //localStorage check here
    let bootstrapDays = this.getDayView();
    this.setState({
      calendarObjects: bootstrapDays
    });
    this.watchTime();
  },
  setCal (type, newStart) {
    console.log(this.state.memos);
    let start = this.state.currentCal.start;
    if(newStart){
      start = newStart;
    }
    this.setState({
      currentCal: update(this.state.currentCal,
        {'type': {$set: type},
         'start': {$set: start}
       })
    });
    //  console.log('setCals start is: ', this.state.currentCal.start);
      if(type === 'Day'){
        this.state.calendarObjects = this.getDayView(start);
      } else if(type === 'Week'){
        this.state.calendarObjects = this.getWeekView(start);
      } else if(type === 'Month'){
        this.state.calendarObjects = this.getMonthView(start);
      } else if(type === 'Year'){
        this.state.calendarObjects = this.getYearView(start);
      }

  },
  cycleCalendar(direction){
  //  console.log('going ', direction);
    let start = this.state.currentCal.start;
    let type = this.state.currentCal.type;
    let newDate;
    let currentTypeString = type.toLowerCase() + 's';
    let startMoment = new Moment(start);

  //  console.log('type string:', currentTypeString);
    if(direction === 'right'){
    //  newDate = new Date( startMoment.add(1, currentTypeString).format('YYYYMMDD');
      newDate = new Date( startMoment.add(1, currentTypeString));
    }
    if(direction === 'left'){
      newDate = new Date( startMoment.subtract(1, currentTypeString));
    }
  //  console.log("start: ", startMoment);
  //  console.log("new Date: ", newDate);
   this.setCal(type, newDate);
 },
 goToPanelView(type, start, key){
  // console.log(type);
  // console.log(start);
  // console.log(key);
   if(type === 'Day'){
     this.select(key);
   } else if(type == 'Week' || type == 'Month'){
      this.setCal('Day', new Date(start));
   } else if (type == 'Year'){
     this.setCal('Month', new Date(start));
   }
 },
  select(e){
    if(this.state.selected === e){
      this.setState({
        selected: null
      });
    } else {
      this.setState({
        selected: e
      });
    }
  },
  displayFormat(_date){
    //   this.setState({openNoteId: Moment(new Date(objTime)).format(' HH:mm, MMMM DD')});
   return Moment(new Date(_date)).format(' HH:mm, MMMM DD');
  //  return 'squeegee';
  },
  openModal: function(objTime) {

    let findMemo = (currentTime) =>{
      let found = false;
       if(this.state.memos.length){
         this.state.memos.forEach(function(memo){
           console.log(memo.time.getHours() + currentTime.getHours());
            if(memo.time.getHours() == currentTime.getHours() &&
              memo.time.getDate() == currentTime.getDate() &&
              memo.time.getMonth() == currentTime.getMonth()
            ){
              console.log('found!');
              found = memo.text;
            }
         });
         if(!!found){
           return found;
         }
       }
       return false;
    }

    let _found = findMemo(new Date(objTime));
  //  let _now = this.state.cuurrentCal.s
   this.setState({modalIsOpen: true});
   if(!!objTime){
     //       display: Moment(new Date(year, month, date, i)).format('hh:mm a'),
//      let formatDate =  Moment(today, "YYYY-MM-DD HH:mm:ss");
    this.setState({openNoteId: new Date(objTime)});

    if(!!_found){
      this.setState({openNoteMsg: _found});
    } else {
      this.setState({openNoteMsg: false});
    }

  //   this.setState({openNoteId: Moment(new Date(objTime)).format(' HH:mm, MMMM DD')});
   }
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    this.setState({openNoteId: ''});
    this.setState({openNoteMsg: ''});
    this.setCal(this.state.currentCal.type);
  },
  changeOpenId(e){
    e.preventDefault();
    this.setState({openNoteId: e.target.value});
  },
  changeOpenMsg(e){
    e.preventDefault();
    this.setState({openNoteMsg: e.target.value});
  },
  saveMemo(){
  //  console.log(this.state.openNoteId, this.state.openNoteMsg);
    this.state.memos.push({time: new Date(Moment(this.state.openNoteId)), text: this.state.openNoteMsg});
    this.closeModal();
  },
  submitMemo(e){
    e.preventDefault();
    this.saveMemo();
  },
  listen(){
    this.state.listening = !this.state.listening;
    annyang.start();
  },
  noListen(){
    this.state.listening = !this.state.listening;
    annyang.abort();
  },
  viewHeader(startDate, type){
            if(type === 'Day'){
              return 'Day of ' + Moment(startDate).format('MMMM') + ' ' + startDate.getDate();
            }
            if(type === 'Week'){
              return 'Week of ' + Moment(startDate).format('MMMM') + ' ' + startDate.getDate();
            }
            if(type === 'Month'){
              return Moment(startDate).format('MMMM') + ' ' + Moment(startDate).format('YYYY');
            }
            if(type === 'Year'){
              return 'Year of ' + Moment(startDate).format('YYYY');
            } else {
            //  console.log('???');
            }
  },
  render() {
    return (
    <MuiThemeProvider>
    <div className="App">
      <AppBar title={"Notifry"} className="nAppBar"
      iconElementLeft={ <IconButton><DateRange/></IconButton> }>
      {/*}<h1 className="notifry">Notifry</h1>*/}
      {/*<div className='mic' onClick={()=> this.state.listening ? this.noListen() : this.listen()}>
        <i className="fa fa-microphone" aria-hidden="true"></i>
      </div>
      <button className='newNote' onClick={() => this.openModal(false)}><h5>New Note</h5></button>*/}
      <Nav setCal={this.setCal} currentCal={this.state.currentCal}/>

    </AppBar>
      <div className='app-container'>
        <div className="cal-header-container">
        {/*import React from 'react';
import IconButton from 'material-ui/IconButton';

const IconButtonExampleSimple = () => (
  <div>
    <IconButton iconClassName="muidocs-icon-custom-github" />
    <IconButton iconClassName="muidocs-icon-custom-github" disabled={true} />
  </div>
)*/}
          <FloatingActionButton className="nFloat">
              <i className="fa fa-hand-o-left" aria-hidden="true" onClick={ () => this.cycleCalendar('left')}></i>
          </FloatingActionButton>
          <Paper className="cal-header" style={{background:'#F0FFFF'}} zDepth = {2}>
            { this.viewHeader(this.state.currentCal.start, this.state.currentCal.type).toString() }
          </Paper>
          <FloatingActionButton className = "nFloat">
            <i className="fa fa-hand-o-right" aria-hidden="true" onClick={ () => this.cycleCalendar('right')}></i>
          </FloatingActionButton>
        </div>
        <Calendar currentCal={this.state.currentCal}
          selected={this.state.selected} select={this.select}
          openModal={this.openModal}
          displayFormat={this.displayFormat}
          openNoteId={this.state.openNoteId}
          openNoteMsg={this.state.openNoteMsg}
          calendarObjects={this.state.calendarObjects}
          goToPanelView={this.goToPanelView} />

          {/*  <DialogExampleSimple
          openModal = {this.openModal}
          openNoteMsg = {this.state.openNoteMsg}
          changeOpenMsg = {this.changeOpenMsg}
          changeOpenId = {this.changeOpenId}
          openNoteId ={ this.state.openNoteId}
          submitMemo = {this.submitMemo}
                  /> */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={popUpStyles}
          contentLabel="Example Modal">
          <Card>
            <CardTitle title={ 'Memo for ' + this.displayFormat(this.state.openNoteId) }></CardTitle>
              <CardText>
              <form>
              <hr />
                <TextField  multiLine={true} rows={2} rowsMax={4} hintText={'Take out the garbage...'}
                onChange={this.changeOpenMsg} value={this.state.openNoteMsg || ''} >
               </TextField>
                <hr />
                {/*<label>date:</label>
                <input onChange={this.changeOpenId} value={this.state.openNoteId}/> */}
                <br />
                <CardActions>
                  <RaisedButton primary={true} onClick={this.submitMemo} label={'Save your memo'} />
                  <RaisedButton secondary={true} onClick={this.closeModal} label={'close'} />
                </CardActions>
              </form>
              </CardText>
            </Card>
        </Modal>
      </div>
    </div>
    </MuiThemeProvider>
  );
  }
});

// var commands = {
//   'add': function() {
//     if(speechSynthesis){
//       speechSynthesis.speak(
//       new SpeechSynthesisUtterance('opening note.')
//      );
//     }
//     openModal(new Date());
//    },
//   'save': function(){
//     if(speechSynthesis){
//       speechSynthesis.speak(
//       new SpeechSynthesisUtterance('note saved!')
//      );
//     }
//     saveMemo();
//   },
//   'cancel': function(){
//         if(speechSynthesis){
//           speechSynthesis.speak(
//           new SpeechSynthesisUtterance('ok, canceling the note.')
//          );
//         }
//     closeModal();
//   }
// };
//
// annyang.addCommands(commands);
//
// annyang.addCallback('result', function(userSaid){
//   //TODO: wtf happened here?
//   //speech += userSaid;
//   console.log('user said:', userSaid);
// });

//Annyang.start();

export default App;
