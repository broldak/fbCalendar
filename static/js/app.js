var Calendar = (function(){
  //default dom element with sample data
  var maxWidth = 600,
      domElement = '<div class="calendar-event">' +
                      '<div class="event-inner">' +
                        '<div class="event-name">' +
                          'Sample Item' +
                        '</div>' +
                        '<div class="event-location">' +
                          'Sample Location' +
                        '</div>' +
                      '</div>' +
                    '</div>';

  return {
    init: function(events) {
      $.each(events, $.proxy(function(index, event){
        event.forward = [];
        event.backward = [];
      }, this));

      this.events = events;
      this.$calendarContainer = $('#calendar-container');

      this.addToDom();
    },

    //sort events, iterate through events and create a DOM element for each
    addToDom: function() {
      //sort the events by start time
      this.events = this.events.sort(function(a, b){
        return a.start - b.start;
      });

      $.each(this.events, $.proxy(function(index, event){
        this.createDomElement(event, index);
      }, this));
    },

    //TODO: add checking for overlaps, etc.
    //adds element to the DOM.
    createDomElement: function(event, index){
      var totalDepth,
          width,
          $elem = $(domElement),
          top = event.start + 'px',
          height = event.end - event.start - 1 + 'px';

      this.findOverlaps(index);
      console.log(event);

      totalDepth = event.forward.length + event.backward.length;
      width = (maxWidth / (totalDepth+1)) >> 0;

      $elem.css('top', top);
      $elem.css('height', height);
      $elem.css('width', width);
      $elem.css('left', (event.backward.length*width)+10);

      this.$calendarContainer.append($elem);
    },

    findOverlaps: function(index) {
      var current,
          event = this.events[index];

      //console.log(event);

      $.each(this.events, $.proxy(function(idx, current){
        if (idx !== index && idx > index) {
          if (current.start >= event.start && current.start < event.end) {
            console.log(index, event, idx, current);
            event.forward.push(current);
            current.backward.push(event);
            //console.log('OVERLAP', event, current);
          }
        }
      }, this));
    }
  }
});

function layOutDay(events) {
  var calendar = new Calendar();
  calendar.init(events);
}

function testLayOutDay() {
  var events = [{start: 60, end: 120}, {start: 30, end: 90}, {start: 40, end: 105}, {start: 40, end: 100},
                {start: 120, end: 180}, {start: 160, end: 210}, {start: 170, end: 300}];

  layOutDay(events);
}

testLayOutDay();
