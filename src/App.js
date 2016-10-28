import React from 'react';
import Modal from 'react-modal';
import update from 'immutability-helper';
//const SpeechKITT = require('../node_modules/speechkitt/dist/speechkitt.min.js');
import annyang from 'annyang';
import Moment from 'moment';
// import FontAwesome from 'react-fontawesome';

import SubComponents from './SubComponents.js';
import Bootstrap from './Bootstrap.js';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const Nav = SubComponents.Nav;
const Calendar = SubComponents.Calendar;

const SpeechSynthesis = (
  window.speechSynthesis ||
  window.webkitSpeechSynthesis
);
let speech;
let openModal, closeModal, saveMemo;

const popUpStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '20px',
    right                      : '20px',
    bottom                     : '20px',
    border                     : '1px solid #ccc',
    background                 : 'rgb(240, 255, 255)',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '2.5px',
    outline                    : 'none',
    padding                    : '5px'
  }
};

const App = React.createClass({
  nextCalView(){
    var nextStart;
    var nextTitle;
    var type = this.state.currentCal.type;
    if(type === 'Day'){
      nextStart = new Moment(this.state.currentCal.start).add(1, 'day').toDate();
      nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
    } else if(type === 'Week'){
      nextStart = new Moment(this.state.currentCal.start).add(7, 'day').toDate();
      nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
    } else if(type === 'Month'){
      nextStart = new Moment(this.state.currentCal.start).add(1, 'month').toDate();
      nextTitle = Moment(nextStart).month() + ' ' + nextStart.getFullYear();
    } else {
      return;
    }
    this.setCal(type, nextStart, nextTitle);
  },
  lastCalView(){
    var nextStart;
    var nextTitle;
    var type = this.state.currentCal.type;
    if(this.state.currentCal.type === 'Day'){
      nextStart = new Moment(this.state.currentCal.start).subtract(1, 'day').toDate();
      nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
    } else if(this.state.currentCal.type === 'Week'){
      nextStart = new Moment(this.state.currentCal.start).subtract(7, 'day').toDate();
      nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
    } else if(this.state.currentCal.type === 'Month'){
      nextStart = new Moment(this.state.currentCal.start).subtract(1, 'month').toDate();
      nextTitle = Moment(nextStart).month() + ' ' + nextStart.getFullYear();
    } else {
      return;
    }
    this.setCal(type, nextStart, nextTitle);
  },
  getDayView(){
    var start = this.state.currentCal.start;
    var today = start.getDay();
    var date = start.getDate();
    var month = start.getMonth();
    var year = start.getYear();
    let hourObjs = [];
    for( let i = 0; i < 24; i++ ){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getHours() == i &&
          memo.time.getDate() === date && memo.time.getMonth() === month){
            memos.push(memo.text);
          }
        });
      }
      hourObjs.push({
        display: i + 1,
        time: new Date(year, month, date, i),
        memos: memos
      });
    }
    // var start = new Date(this.state.currentCal.start);
     var title = start.getMonth() + ' / ' + start.getDate();
    // this.setState({
    //   currentCal: update(this.state.currentCal, {'title': {$set: title}})
    // });
    return hourObjs;
  },
  getWeekView(){
    var today = new Date(this.state.currentCal.start);
    var weekDays = [];
    for(var i = 0; i < 7; i++){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === today.getDate()
          && memo.time.getMonth() === today.getMonth()){
            memos.push(memo.text);
          }
        });
      }
      let formatDate =  Moment(today, "YYYY-MM-DD HH:mm:ss");
      weekDays.push({
        display: Moment(formatDate).format('dddd'),
        time: new Date(today.getYear(), today.getMonth(), today.getDate()),
        memos: memos
      });
      today = Moment(today).add(1, 'day').toDate();
    }
    // var start = new Date(this.state.currentCal.start);
    // var title = start.getMonth() + ' / ' + start.getDate();
    // this.setState({
    //   currentCal: update(this.state.currentCal, {'title': {$set: title}})
    // });
    return weekDays;
  },
  getMonthView(){
    var monthDays = [];
    let today = new Date(this.state.currentCal.start)
    var dayCount = Moment(this.state.currentCal.start).daysInMonth();
    today = new Date(today.getYear(), today.getMonth(), 1);

    for(let i = 1; i < dayCount + 1; i++){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === i && memo.time.getMonth() === today.getMonth()){
             memos.push(memo.text);
             console.log('pushed');
          }
        });
      }
      monthDays.push({
        display: i,
        time: new Date(today),
        memos: memos
      });
      today = new Moment(today).add(1, 'day').toDate();

    }
      // var start = new Date(this.state.currentCal.start);
      // var title = Moment(start).month() + ' ' + start.getFullYear();
      // this.setState({
      //   currentCal: update(this.state.currentCal, {'title': {$set: title}})
      // });
      return monthDays;
  },
  getYearView(){
    var yearMonths = [];
    var month = this.state.currentCal.start;
    for(let i = 0; i < 6; i++){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getMonth() === month.getMonth()){
            memos.push(memo.text);
          }
        });
      }
      yearMonths.push({
        display: month.getMonth() + 1,
        time: new Date(month.getYear(), month.getMonth(), month.getDay()),
        memos: memos
      });
      month = Moment(month).add(1, 'month').toDate();
    }
      // var start = new Date(this.state.currentCal.start);
      // var title = Moment(start).month() + ' ' + start.getFullYear();
      // this.setState({
      //   currentCal: update(this.state.currentCal, {'title': {$set: title}})
      // });
     return yearMonths;
  },
  getInitialState()  {
    //localstorage check will go here
    openModal = this.openModal;
    closeModal = this.closeModal;
    saveMemo = this.saveMemo;
    let memos = [];
    let now = new Date();
    return { currentCal: {start: now, type: 'Day', title: now.getMonth() + ' / ' + now.getDate()},
    calendarObjects: [],
      modalIsOpen: false,
      openNoteId: '',
      openNoteMsg: null,
      listening: false,
      memos: memos
    };
  },
  componentWillMount(){
    //localStorage check here
     let now = new Date();
     this.setCal('Day', now, now.getMonth() + ' / ' + now.getDate())
  },
  setCal (newType, newStart, newTitle) {
    var start = newStart;
    var title = newTitle;
    if(!start){
      start = this.state.currentCal.start;
    }
    if(!title){
        title = this.state.currentCal.title;
      // if(type === 'Day'){
      //   nextStart = new Moment(this.state.currentCal.start).add(1, 'day').toDate();
      //   nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
      // } else if(type === 'Week'){
      //   nextStart = new Moment(this.state.currentCal.start).add(7, 'day').toDate();
      //   nextTitle = nextStart.getMonth() + ' / ' + nextStart.getDate();
      // } else if(type === 'Month'){
      //   nextStart = new Moment(this.state.currentCal.start).add(1, 'month').toDate();
      //   nextTitle = Moment(nextStart).month() + ' ' + nextStart.getFullYear();
      // } else {
      //   return;
      // }
    }
    this.setState({
      currentCal: update(this.state.currentCal, {'start': {$set: start}, 'title': {$set: title}, 'type': {$set: newType}})
    });
    if(newType === 'Day'){
      this.state.calendarObjects = this.getDayView();
    } else if(newType === 'Week'){
      this.state.calendarObjects = this.getWeekView();
    } else if(newType === 'Month'){
      this.state.calendarObjects = this.getMonthView();
    } else if(newType === 'Year'){
      this.state.calendarObjects = this.getYearView();
    }
  },
  select(e){
    if(this.state.selected === e){
      this.setState({ selected: null });
    } else {
      this.setState({ selected: e });
    }
  },
  selectNav(){
    // hilite nav pills
  },
  openModal: function(objTime) {
   this.setState({modalIsOpen: true});
   if(objTime){
     this.setState({openNoteId: objTime});
   }
  },
  afterOpenModal: function() {
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function() {
    this.setState({modalIsOpen: false},{openNoteId: ''},{openNoteMsg: ''});
    this.setCal(this.state.currentCal.type, false, false);
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
    this.state.memos.push({time: new Date(this.state.openNoteId), text: this.state.openNoteMsg});
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
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1 className="notifry">Notifry</h1>
        <div className='mic' onClick={()=> this.state.listening ? this.noListen() : this.listen()}>
          <i className="fa fa-microphone" aria-hidden="true"></i>
        </div>
        <button className='newNote' onClick={() => this.openModal(false)}><h5>New Note</h5></button>
      </div>
        <div className='app-container'>
          <Nav setCal={this.setCal} currentCal={this.state.currentCal}/>
          <Calendar currentCal={this.state.currentCal}
            selected={this.state.selected} select={this.select}
            openModal={this.openModal}
            openNoteId={this.state.openNoteId} openNoteMsg={this.state.openNoteMsg}
            nextCalView={this.nextCalView}
            lastCalView={this.lastCalView}
            calendarObjects={this.state.calendarObjects} />
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={popUpStyles}
            contentLabel="Example Modal">
              <h2 ref="subtitle">New Note</h2>
              <button onClick={this.closeModal}>close</button>
              <form>
                <label>note msg:</label>
                <input onChange={this.changeOpenMsg} value={this.state.openNoteMsg}/>
                <br />
                <label>date:</label>
                <input onChange={this.changeOpenId} value={this.state.openNoteId}/>
                <br />
                <button onClick={this.submitMemo}>Save your memo</button>
              </form>
          </Modal>
        </div>
      </div>
    );
  }
});

var commands = {
  'add': function() {
    if(speechSynthesis){
      speechSynthesis.speak(
      new SpeechSynthesisUtterance('opening note.')
     );
    }
    openModal(new Date());
   },
  'save': function(){
    if(speechSynthesis){
      speechSynthesis.speak(
      new SpeechSynthesisUtterance('note saved!')
     );
    }
    saveMemo();
  },
  'cancel': function(){
        if(speechSynthesis){
          speechSynthesis.speak(
          new SpeechSynthesisUtterance('ok, canceling the note.')
         );
        }
    closeModal();
  }
};

annyang.addCommands(commands);

annyang.addCallback('result', function(userSaid){
  speech += userSaid;
  console.log('user said:', userSaid);
});

  // Tell KITT to use annyang
  // SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  //'../node_modules/speechkitt/dist/themes/flat.css'
  // SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  // SpeechKITT.vroom();

//Annyang.start();

export default App;
