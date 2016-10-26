import React from 'react';
import './App.css';
import Modal from 'react-modal';
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
  componentWillMount(){
    if(this.props.currentCal.type === 'Day'){
      this.props.calendarObjects = this.props.getDayView();
    } else if(this.props.currentCal.type === 'Week'){
      this.props.calendarObjects = this.props.getWeekView();
    } else if(this.props.currentCal.type === 'Month'){
      this.props.calendarObjects = this.props.getMonthView();
    } else if(this.props.currentCal.type === 'Year'){
      this.props.calendarObjects = this.props.getYearView();
    }
  },
  render() {
    // let calProps = this.props;
    // let calResults = calProps.calObjects[calProps.currentCal];
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
        {
            this.props.calendarObjects.map(function(obj, i){
              let memoText;
              // obj["memos"].length ? (memoText = obj["memos"].reduce(function(a, b){return a + b;})) : (memoText = '');

              return <Panel className='panel-fluid' key={i + '_' + obj.name + '_' + this.props.currentCal.type}
              propKey={i + '_' + obj.name + '_' + this.props.currentCal.type}
              currentCal={this.props.currentCal.type}
              calName={obj.name}
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
    var month - this.state.currentCal.start.getMonth();

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
        time: today.format('dddd'),
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
    for(var i = 0; i < 6; i++){
      let year = month.getYear();
      let month;
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
      yearMonths.push({time: month.getMonth()}, {memos: memos});
      month = Moment(today).add(1, 'month').toDate();
    }
     return yearMonths;
    // {month, memos}
  },
  getInitialState() {
    // 1. hours from now: Moments = [{times}]
    // 2. memos = [{day: x, month: y, hour: z, memos: []]
    // 3. this.currentCal = [{start: now(?), type: 'Week Day Month']
    let memos = [];
    return { currentCal: {start: new Date(), type: 'Day'},
      modalIsOpen: false,
      openNoteId: '',
      openNoteMsg: null,
      memos: memos
    };
  },
  setCal (e) {
    this.setState({
      currentCal: e
    });
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
            calendarObjects={[]}
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
