import React from 'react';
import './App.css';
import Modal from 'react-modal';
import SubComponents from './SubComponents.js';
import Annyang from 'annyang';
import Bootstrap from './Bootstrap.js';
import Moment from 'moment'

var moments = [];
//foo = new moment(something).add(10, 'm').toDate();
function  getAllHours() {
  var now = new Date();
  var then = Moment(now).add(6, 'month').toDate();
  while(then > now){
    moments.push({date: new Date(then), memos: []});
    then = Moment(then).subtract(1, 'hour').toDate();
  }
  console.log('moments: ', moments);
  console.log('then: ', then);
}

//sub components
const Panel = SubComponents.Panel;
const Nav = SubComponents.Nav;
//user speech var
var speech;
//var commands;
// function setCommands(commands){
//   Annyang.addCommands(commands);
// }

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

const Calendar = React.createClass({
  getDayView(){

  },
  getWeekView(){

  },
  getMonthView(){

  },
  getYearView(){

  },
  render() {
    let calProps = this.props;
    let calResults = calProps.calObjects[calProps.currentCal];
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
      {/* voice test */}
      <h3> Annyang Test: </h3>
      <p> userSaid: {speech} </p>
        {
            calResults.map(function(obj, i){
              let memoText;
              obj["memos"].length ? (memoText = obj["memos"].reduce(function(a, b){return a + b;})) : (memoText = '');

              return <Panel className='panel-fluid' key={i + '_' + obj.name + '_' + calProps.currentCal}
              propKey={i + '_' + obj.name + '_' + calProps.currentCal}
              currentCal={calProps.currentCal}
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
  getInitialState() {
    //return Bootstrap;
    getAllHours();
    return moments;
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
            calObjects={this.state.calObjects}
            selected={this.state.selected} select={this.select}
            openModal={this.openModal}
            openNoteId={this.state.openNoteId} openNoteMsg={this.state.openNoteMsg}
            checkMemo={this.checkMemo}/>

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
