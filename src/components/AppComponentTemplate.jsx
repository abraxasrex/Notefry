//
//
// var React = require('react');
// import popUpStyles from './styles.js';
//
// import Nav from './Nav.js';
// import Calendar from './Calendar.js';
// import Bootstrap from '../Bootstrap.js';
//
// const AppComponentTemplate = () => {
//   return (
//   <div className="App">
//     <div className="App-header">
//     <h1 className="notifry">Notifry</h1>
//     <div className='mic' onClick={()=> this.state.listening ? this.noListen() : this.listen()}>
//       <i className="fa fa-microphone" aria-hidden="true"></i>
//     </div>
//     <button className='newNote' onClick={() => this.openModal(false)}><h5>New Note</h5></button>
//   </div>
//     <div className='app-container'>
//       <Nav setCal={this.setCal} currentCal={this.state.currentCal}/>
//       <div className="cal-header-container">
//         <div className = "left-arrow">
//             <i className="fa fa-hand-o-left" aria-hidden="true" onClick={ () => this.cycleCalendar('left')}></i>
//         </div>
//         <div className="cal-container cal-header" style={{background:'#F0FFFF'}}>
//           { this.viewHeader(this.state.currentCal.start, this.state.currentCal.type).toString() }
//         </div>
//         <div className = "right-arrow">
//           <i className="fa fa-hand-o-right" aria-hidden="true" onClick={ () => this.cycleCalendar('right')}></i>
//         </div>
//       </div>
//       <Calendar currentCal={this.state.currentCal}
//         selected={this.state.selected} select={this.select}
//         openModal={this.openModal}
//         openNoteId={this.state.openNoteId}
//         openNoteMsg={this.state.openNoteMsg}
//         calendarObjects={this.state.calendarObjects}
//         goToPanelView={this.goToPanelView} />
//       <Modal
//         isOpen={this.state.modalIsOpen}
//         onAfterOpen={this.afterOpenModal}
//         onRequestClose={this.closeModal}
//         style={popUpStyles}
//         contentLabel="Example Modal">
//           <h2 ref="subtitle">New Note</h2>
//           <button onClick={this.closeModal}>close</button>
//           <form>
//             <label>note msg:</label>
//             <br />
//             <textarea onChange={this.changeOpenMsg} value={this.state.openNoteMsg || ''} ></textarea>
//             <br />
//             <label>date:</label>
//             <input onChange={this.changeOpenId} value={this.state.openNoteId}/>
//             <br />
//             <button onClick={this.submitMemo}>Save your memo</button>
//           </form>
//       </Modal>
//     </div>
//   </div>
// );
// };
//
// export default AppComponentTemplate;
