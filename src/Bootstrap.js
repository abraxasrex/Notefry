import moment from 'moment';

var Bootstrap = {
    currentCal: 'Week',
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
      // non-calendar-bootstrap props //
      modalIsOpen: false,
      openNoteId: '',
      opneNoteMsg: null
    }
};

var moments = [
  {date: 'datestring', memos: []}
];

// var Bootstrap = function (){
//   var now = new Date();
//   var then = now.setMonth(now.getMonth() + 1);
//   while(now < then){
//     moments.push({date: now, memos: []});
//     now.setHours(now.getHours() + 1);
//   }
//   console.log(moments);
// }

function aggregateHoursForDay(){

}

function aggregateDaysForWeek(){

}

function aggregateWeeksForMonth(){

}

export default Bootstrap
