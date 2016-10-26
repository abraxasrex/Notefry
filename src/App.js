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

// var Memos = [];
// memo = {hour: x, day: x, month: x, memos: []}
// var moments = [];
//foo = new moment(something).add(10, 'm').toDate();
// function  getAllHours() {
//   var now = new Date();
//   var then = Moment(now).add(6, 'month').toDate();
//   while(then > now){
//     moments.push({date: new Date(then), memos: []});
//     then = Moment(then).subtract(1, 'hour').toDate();
//   }
//   console.log('moments: ', moments);
//   console.log('then: ', then);
// }

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
              //accepts obj.time, obj.memos
            //  console.log('obj is... ', obj);
              let memoText;
              obj.memos.length ? (memoText = obj.memos.reduce(function(a, b){return a + b;})) : (memoText = '');

              return <Panel className='panel-fluid' key={i + '_' + obj.name + '_' + calProps.currentCal.type}
              propKey={i + '_' + obj.name + '_' + calProps.currentCal.type}
              currentCal={calProps.currentCal.type}
              //calName={obj.name}
              time ={obj.time}
              // ^ 1. 1-24 dates, 2. Weekday, 3. day name, 4. month name
              // calTitle
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
  componentDidMount() {
    console.log('mounted component');
  },
  nextCalView(){
    if(this.state.currentCal.type === 'Day'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(1, 'day').toDate();
    } else if(this.state.currentCal.type === 'Week'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(7, 'day').toDate();
    } else if(this.state.currentCal.type === 'Month'){
      this.state.currentCal.start = new Moment(this.state.currentCal.start).add(1, 'month').toDate();
    }
    //no year next/last
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
    /// for ui
    var today = this.state.currentCal.start.getDay();

    var date = this.state.currentCal.start.getDate();
    var month = this.state.currentCal.start.getMonth();

    let hourObjs = [];

    for( let i = 0; i < 24; i++ ){
      let memos = [];

      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.memos.length && memos.memo.hour == i && memos.memo.date == date && memos.memo.month == month){
            memo.memos.forEach(function(m){
              memos.push(m);
            });
          }
        });
      }
      hourObjs.push({
        time:i,
        memos: memos
      });
    }
      return hourObjs;
          //return hourObjs {hour, memos}
  },
  getWeekView(){
    var today = Moment(this.state.currentCal.start, "YYYY-MM-DD HH:mm:ss");
    var weekDays = [];

    for(var i = 0; i < 7; i++){
      let memos = [];

      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.memos.length && memos.memo.date == today.getDay() && memos.memo.month == today.getMonth()){
            memo.memos.forEach(function(m){
              memos.push(m);
            });
          }
        });
      }

      weekDays.push({
        time: Moment(today).format('dddd'),
        memos: memos
      });
      today = new Moment(today).add(1, 'day').toDate();
    }
    return weekDays;
  // return weekDays {day, memos}
  },
  getMonthView(){
    var monthDays = [];
    var today = this.state.currentCal.start;
    var dayCount = Moment(today).daysInMonth();
    for(let i = 1; i < dayCount + 1; i++){
      let memos = [];

      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.memos.length && memos.memo.date == today.getDay() && memos.memo.month == today.getMonth()){
            memo.memos.forEach(function(m){
              memos.push(m);
            });
          }
        });
      }

      monthDays.push({
        time: today.getDate(),
        memos: memos
      });
      today = new Moment(today).add(1, 'day').toDate();
    }
      return monthDays;
    // return monthDays {date, memos}
  },
  getYearView(){
    var yearMonths = [];
    var month = this.state.currentCal.start;
        //  console.log('month is.... ', month.getMonth());
    for(let i = 0; i < 6; i++){

      //var year = month.getFullYear();
      //let month;
      let memos = [];
      //get memos
      if(this.state.memos.length){
        this.state.memos.forEach(function(memo){
          if(memo.memos.length && memos.memo.month == month.getMonth()){
            memo.memos.forEach(function(m){
              memos.push(m);
            });
          }
        });
      }
      yearMonths.push({time: month.getMonth(), memos: memos});
      month = Moment(month).add(1, 'month').toDate();
    }
     return yearMonths;
    // {month, memos}
  },
  // 1. hours from now: Moments = [{times}]
  // 2. memos = [{day: x, month: y, hour: z, memos: []]
  // 3. this.currentCal = [{start: now(?), type: 'Week Day Month']
  getInitialState()  {
    let memos = [];
    //var bootstrapDays = this.getDayView();
    //console.log(' these days are .... ', bootstrapDays);
    return { currentCal: {start: new Date(), type: 'Year'},
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
  //   items: update(this.state.items, {1: {name: {$set: 'updated field name'}}})

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
  openModal: function(panelKey) {
   this.setState({modalIsOpen: true});
   if(!!panelKey){
     console.log(panelKey);
     this.setState({openNoteId: panelKey});
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
    let memo = {id: this.state.openNoteId, text: this.state.openNoteMsg};
    let name = this.state.openNoteId.split('_')[1];
        // 2. memos = [{day: x, month: y, hour: z, memos: []]
        // this.state.memos
        //
    this.state.calObjects[this.state.currentCal].forEach(function(obj){
      if(obj.name === name){
        obj.memos.push(memo.text);
      }
    });
    this.closeModal();
  },
  submitMemo(e){
    e.preventDefault();
    this.saveMemo();
  },
  checkMemo(id){
    this.state.allMemos.forEach(function(memo){
      if(memo.id === id){
        return memo.text;
      }
    })
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
