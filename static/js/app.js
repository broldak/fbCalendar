var Calendar = (function(){
  return {
    init: function(events) {
      this._events = events;
      console.log(events);
    }
  }
});

function layOutDay(events) {
  var calendar = new Calendar();
  calendar.init(events);
}
