import moment from 'moment';

var Bootstrap = {
    currentCal: 'Week',
    calObjects: {
        Day: [
          {name: '1AM', memo: []},
          {name: '2AM', memo: []},
          {name: '3AM', memo: []},
          {name: '4AM', memo: []},
          {name: '5AM', memo: []},
          {name: '6AM', memo: []},
          {name: '7AM', memo: []},
          {name: '8AM', memo: []},
          {name: '9AM', memo: []},
          {name: '10AM', memo: []},
          {name: '11AM', memo: []},
          {name: '12AM', memo: []},
          {name: '1PM', memo: []},
          {name: '2PM', memo: []},
          {name: '3PM', memo: []},
          {name: '4PM', memo: []},
          {name: '5PM', memo: []},
          {name: '6PM', memo: []},
          {name: '7PM', memo: []},
          {name: '8PM', memo: []},
          {name: '9PM', memo: []},
          {name: '10PM', memo: []},
          {name: '11PM', memo: []},
          {name: '12PM', memo: []}
        ],
      Week: [
        {name: 'Monday', date: '', memo: []},
        {name: 'Tuesday', date: '', memo: []},
        {name: 'Wednesday', date: '', memo: []},
        {name: 'Thursday', date: '', memo: []},
        {name: 'Friday', date: '', memo: []},
        {name: 'Saturday', date: '', memo: []},
        {name: 'Sunday', date: '', memo: []}
      ],
      Month: [
        {name:1,memo:[]},
        {name:2,memo:[]},
        {name:3,memo:[]},
        {"name":4,"memo":[]},
        {"name":5,"memo":[]},
        {"name":6,"memo":[]},
        {"name":7,"memo":[]},
        {"name":8,"memo":[]},
        {"name":9,"memo":[]},
        {"name":10,"memo":[]},
        {"name":11,"memo":[]},
        {"name":12,"memo":[]},
        {"name":13,"memo":[]},
        {"name":14,"memo":[]},
        {"name":15,"memo":[]},
        {"name":16,"memo":[]},
        {"name":17,"memo":[]},
        {"name":18,"memo":[]},
        {"name":19,"memo":[]},
        {"name":20,"memo":[]},
        {"name":21,"memo":[]},
        {"name":22,"memo":[]},
        {"name":23,"memo":[]},
        {"name":24,"memo":[]},
        {"name":25,"memo":[]},
        {"name":26,"memo":[]},
        {"name":27,"memo":[]},
        {"name":28,"memo":[]},
        {"name":29,"memo":[]},
        {"name":30,"memo":[]},
        {"name":31,"memo":[]},
        {"name":'',"memo":[]}
      ],
      Year: [
        {name: 'January', memo: []},
        {name: 'February', memo: []},
        {name: 'March', memo: []},
        {name: 'April', memo: []},
        {name: 'May', memo: []},
        {name: 'June', memo: []},
        {name: 'July', memo: []},
        {name: 'August', memo: []},
        {name: 'September', memo: []},
        {name: 'October', memo: []},
        {name: 'November', memo: []},
        {name: 'December', memo: []}
      ],
      // non-calendar-bootstrap props //
      modalIsOpen: false,
      openNoteId: '',
      opneNoteMsg: null
    }
};

var moments = [
  {date: 'datestring', memo: []}
];

export default Bootstrap
