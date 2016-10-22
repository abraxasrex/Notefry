import React from 'react';
import './App.css';
import Modal from 'react-modal';

const NavPill = React.createClass({
  render () {
    return <div className='nav-partial' style={this.props.style}
      onClick={() => this.props.setCal(this.props.pillName)}>
      {this.props.pillName}
    </div>
  }
});

const Nav = React.createClass ({
  render () {
    return <div className='nav-full'>
      <NavPill className='nav-partial' style={{background: '#FFA07A'}} pillName='Day' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FF7F50'}} pillName='Week' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FF8C00'}} pillName='Month' setCal={this.props.setCal}/>
      <NavPill className='nav-partial' style={{background: '#FFA500'}} pillName='Year' setCal={this.props.setCal}/>
    </div>
  }
});

const Panel = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },
  render() {
     let panelClasses = 'cal-panel ' + this.props.currentCal + '-cal-panel';
     let hilite  = '#FF8C00';
     let normal = '#FFA07A';
    return (
      <div className={panelClasses}
        style={  (this.props.selected === this.props.propKey) ? {background: hilite} : {background: normal}}
        onClick={() => this.props.select(this.props.propKey) } >
         {this.props.memoText || ''}
        <div className='littleBox' onClick={() => this.props.openModal(this.props.propKey)}>+</div>
        {this.props.calName || 'not set'}
      </div>
    );
  }
});

const Calendar = React.createClass({
  render() {
    let calProps = this.props;
    let calResults = calProps.calObjects[calProps.currentCal];
    /* return panels */
    return (
      <div className='cal-container' style={{background:'#F0FFFF'}}>
        {
            calResults.map(function(obj, i){
              let memoText;
              obj["memos"].length ? (memoText = obj["memos"].reduce(function(a, b){return a + b;})) : (memoText = '');

              return <Panel className='panel-fluid' key={i + '_' + obj.name + '_' + calProps.currentCal}
              propKey={i + '_' + obj.name + '_' + calProps.currentCal}
              currentCal={calProps.currentCal} calName={obj.name}
              selected={calProps.selected} select={calProps.select}
              openModal={calProps.openModal}
              openNoteId={calProps.openNoteId} openNoteMsg={calProps.openNoteMsg}
              allMemos={calProps.allMemos}
              checkMemo={calProps.checkMemo}
              memoText={ memoText} />
            })
       }
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
        currentCal: 'Week',
        calCounts: [
          'Day': 24,
          'Week': 7,
          'Month': 30,
          'Year': 12
        ],
        allMemos: [],
        calObjects: {
            Day: [
              {name: '1AM', memos: []},
              {name: '2AM', memos: []},
              {name: '3AM', memos: []},
              {name: '4AM', memos: []},
              {name: '5AM', memos: []},
              {name: '6AM', memos: []},
              {name: '7AM', memos: []},
              {name: '8AM', memos: []},
              {name: '9AM', memos: []},
              {name: '10AM', memos: []},
              {name: '11AM', memos: []},
              {name: '12AM', memos: []},
              {name: '1PM', memos: []},
              {name: '2PM', memos: []},
              {name: '3PM', memos: []},
              {name: '4PM', memos: []},
              {name: '5PM', memos: []},
              {name: '6PM', memos: []},
              {name: '7PM', memos: []},
              {name: '8PM', memos: []},
              {name: '9PM', memos: []},
              {name: '10PM', memos: []},
              {name: '11PM', memos: []},
              {name: '12PM', memos: []}
            ],
          Week: [
            {name: 'Monday', date: '', memos: []},
            {name: 'Tuesday', date: '', memos: []},
            {name: 'Wednesday', date: '', memos: []},
            {name: 'Thursday', date: '', memos: []},
            {name: 'Friday', date: '', memos: []},
            {name: 'Saturday', date: '', memos: []},
            {name: 'Sunday', date: '', memos: []}
          ],
          Month: [
            {name:1,memos:[]},
            {name:2,memos:[]},
            {name:3,memos:[]},
            {"name":4,"memos":[]},
            {"name":5,"memos":[]},
            {"name":6,"memos":[]},
            {"name":7,"memos":[]},
            {"name":8,"memos":[]},
            {"name":9,"memos":[]},
            {"name":10,"memos":[]},
            {"name":11,"memos":[]},
            {"name":12,"memos":[]},
            {"name":13,"memos":[]},
            {"name":14,"memos":[]},
            {"name":15,"memos":[]},
            {"name":16,"memos":[]},
            {"name":17,"memos":[]},
            {"name":18,"memos":[]},
            {"name":19,"memos":[]},
            {"name":20,"memos":[]},
            {"name":21,"memos":[]},
            {"name":22,"memos":[]},
            {"name":23,"memos":[]},
            {"name":24,"memos":[]},
            {"name":25,"memos":[]},
            {"name":26,"memos":[]},
            {"name":27,"memos":[]},
            {"name":28,"memos":[]},
            {"name":29,"memos":[]},
            {"name":30,"memos":[]},
            {"name":31,"memos":[]},
            {"name":'',"memos":[]}
          ],
          Year: [
            {name: 'January', memos: []},
            {name: 'February', memos: []},
            {name: 'March', memos: []},
            {name: 'April', memos: []},
            {name: 'May', memos: []},
            {name: 'June', memos: []},
            {name: 'July', memos: []},
            {name: 'August', memos: []},
            {name: 'September', memos: []},
            {name: 'October', memos: []},
            {name: 'November', memos: []},
            {name: 'December', memos: []}
          ],
          // non-calenda-bootstrap props //
          modalIsOpen: false,
          openNoteId: '',
          opneNoteMsg: null
        }
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
  },
  changeOpenId(e){
    e.preventDefault();
    this.setState({openNoteId: e.target.value});
  },
  changeOpenMsg(e){
    e.preventDefault();
    this.setState({openNoteMsg: e.target.value});
  },
  submitMemo(e){
    e.preventDefault();
    let memo = {id: this.state.openNoteId, text: this.state.openNoteMsg};
    let name = this.state.openNoteId.split('_')[1];
    //push it (and render it in the panel later)
    //console.log('objects: ', this.state.calObjects, 'current callendar: ', this.state.currentCal);
    this.state.calObjects[this.state.currentCal].forEach(function(obj){
      if(obj.name === name){
        obj.memos.push(memo.text);
      }
    });
    //console.log('memos: ', this.state.allMemos);
    this.closeModal();
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
            allMemos={this.state.allMemos} checkMemo={this.checkMemo}/>

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

export default App;
