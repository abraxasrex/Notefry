import React from 'react';
import './App.css';
import Modal from 'react-modal';
import update from 'immutability-helper';
import SubComponents from './SubComponents.js';
import Annyang from 'annyang';
import Bootstrap from './Bootstrap.js';
import Moment from 'moment';
//sub components
const Panel = SubComponents.Panel;
const Nav = SubComponents.Nav;

/// annyang methods ////////////////////////////////////////////////////
var speech;
var commands = {
  'add': function() {
    alert('add!');
  //  ctx.openModal();
   },
  'save': function(){
    alert('save!');
    //  ctx.closeModal();
  },
  'cancel': function(){
  //    ctx.saveMemo();
  alert('cancel!');
  }
};

Annyang.addCommands(commands);

Annyang.addCallback('result', function(userSaid){
  speech += userSaid;
  console.log('user said:', userSaid);
});

Annyang.start();

//////////////////////////////////////////////////////////

const Calendar = React.createClass({
  render() {
    let calProps = this.props;
    var calMap = this.props.calendarObjects;
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
        {
            calMap.map(function(obj, i){
              let memoText;
              obj.memos.length ? (memoText = obj.memos.reduce(function(a, b){return a +  ', ' + b;})) : (memoText = '');
              return <Panel className='panel-fluid' key={obj.time}
              propKey={obj.time}
              currentCal={calProps.currentCal}
              display ={obj.display}
              selected={calProps.selected}
              select={calProps.select}
              openModal={calProps.openModal}
              openNoteId={calProps.openNoteId}
              openNoteMsg={calProps.openNoteMsg}
              checkMemo={calProps.checkMemo}
              memoText={ memoText} />
            })
       }
      </div>
    );
  }
});

const App = React.createClass({
  nextCalView(){
    if(this.state.currentCal.type === 'Day'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(1, 'day').toDate();
    } else if(this.state.currentCal.type === 'Week'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(7, 'day').toDate();
    } else if(this.state.currentCal.type === 'Month'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(1, 'month').toDate();
    }
  },
  lastCalView(){
    if(this.state.currentCal.type === 'Day'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).subtract(1, 'day').toDate();
    } else if(this.state.currentCal.type === 'Week'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).subtract(7, 'day').toDate();
    } else if(this.state.currentCal.type === 'Month'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).subtract(1, 'month').toDate();
    }
  },
  getDayView(){
    var today = this.state.currentCal.start.getDay();
    var date = this.state.currentCal.start.getDate();
    var month = this.state.currentCal.start.getMonth();
    var year = this.state.currentCal.start.getYear();
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
      return hourObjs;
  },
  getWeekView(){
    var today = new Date(this.state.currentCal.start);
    var weekDays = [];
    for(var i = 0; i < 7; i++){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === today.getDay()
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
    return weekDays;
  },
  getMonthView(){
    var monthDays = [];
    var today = this.state.currentCal.start;
    var dayCount = Moment(today).daysInMonth();
    for(let i = 1; i < dayCount + 1; i++){
      let memos = [];
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.time.getDate() === today.getDate() && memo.time.getMonth() === today.getMonth()){
             memos.push(memo.text);
          }
        });
      }
      monthDays.push({
        display: i,
        time: today.getDate(),
        memos: memos
      });
      today = new Moment(today).add(1, 'day').toDate();
    }
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
        display: month.getMonth(),
        time: new Date(month.getYear(), month.getMonth(), month.getDay()),
        memos: memos
      });
      month = Moment(month).add(1, 'month').toDate();
    }
     return yearMonths;
  },
  getInitialState()  {
    let memos = [];
    return { currentCal: {start: new Date(), type: 'Day'},
    calendarObjects: [],
      modalIsOpen: false,
      openNoteId: '',
      openNoteMsg: null,
      memos: memos
    };
  },
  componentWillMount(){
    let bootstrapDays = this.getDayView();
    this.setState({
      calendarObjects: bootstrapDays
    })
  },
  setCal (e) {
    this.setState({
      currentCal: update(this.state.currentCal, {'type': {$set: e}})
    });
    if(e === 'Day'){
      this.state.calendarObjects = this.getDayView();
    } else if(e === 'Week'){
      this.state.calendarObjects = this.getWeekView();
    } else if(e === 'Month'){
      this.state.calendarObjects = this.getMonthView();
    } else if(e === 'Year'){
      this.state.calendarObjects = this.getYearView();
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
  openModal: function(objTime) {
   this.setState({modalIsOpen: true});
   if(!!objTime){
     this.setState({openNoteId: objTime});
   }
  },
  afterOpenModal: function() {
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    this.setState({openNoteId: ''});
    this.setState({openNoteMsg: ''});
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
    this.state.memos.push({time: this.state.openNoteId, text: this.state.openNoteMsg});
    this.closeModal();
  },
  submitMemo(e){
    e.preventDefault();
    this.saveMemo();
  },
  checkMemo(id){
    // this.state.allMemos.forEach(function(memo){
      // if(memo.id === id){
      //   return memo.text;
      // }
      // if(this.state.currentCal.type === 'Day'){
      //
      // } else if (this.state.currentCal.type === 'Week'){
      //
      // } else if (this.state.currentCal.type === 'Month'){
      //
      // } else if (this.state.currentCal.type === 'Year'){
      //
      // }
    // });
  },
  render() {
    let popUpStyles = {
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
    return (
      <div className="App">
        <div className="App-header">
        <h1>Notifry</h1>
        <button onClick={() => this.openModal(false)}><h5>New Note</h5></button>
      </div>
        <div className='app-container'>
          <Nav setCal={this.setCal} currentCal={this.state.currentCal}/>

          <Calendar currentCal={this.state.currentCal}
            // calObjects={this.state.calObjects}
            memos = {this.state.memos}
            selected={this.state.selected} select={this.select}
            openModal={this.openModal}
            openNoteId={this.state.openNoteId} openNoteMsg={this.state.openNoteMsg}
            checkMemo={this.checkMemo}
            calendarObjects={this.state.calendarObjects}
            getDayView={this.getDayView} getWeekView={this.getWeekView} getMonthView={this.getMonthView} getYearView={this.getYearView}/>

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

//


export default App;
