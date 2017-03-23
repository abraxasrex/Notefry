// import Moment from 'moment';
//
//
// const getDayView =  (start, that) => {
//   let _start = this.state.currentCal.start;
//   if(start){
//     _start = start;
//   }
//   var today = _start.getDay();
//   var date = _start.getDate();
//   var month = _start.getMonth();
//   var year = _start.getYear();
//   let hourObjs = [];
//   for( let i = 0; i < 24; i++ ){
//     let _memo;
//     if(this.state.memos.length){
//       this.state.memos.forEach(function(memo){
//         if(memo.time.getHours() == i &&
//         memo.time.getDate() === date && memo.time.getMonth() === month){
//           _memo = memo.text;
//         }
//       });
//     }
//   //  let displayTime = Moment(new Date(year, month, date, i));
//     hourObjs.push({
//       //TODO momentify panel display
//       display: Moment(new Date(year, month, date, i)).format('hh:mm a'),
//       time: new Date(year, month, date, i),
//       memo: _memo
//     });
//   }
//     return hourObjs;
// };
//
// export default getDayView;
