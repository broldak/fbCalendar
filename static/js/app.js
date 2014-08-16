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
          directOverlaps,
          $elem = $(domElement),
          top = event.start + 'px',
          height = event.end - event.start - 1 + 'px';

      this.findOverlaps(index);

      console.log(event);
      //console.log(event);
      directOverlaps = this.findDirectOverlaps(event);

      console.log(directOverlaps);

      totalDepth = event.forward.length + event.backward.length;
      width = (maxWidth / (totalDepth+1)) >> 0;

      $elem.css('top', top);
      $elem.css('height', height);
      $elem.css('width', width);
      $elem.css('left', (directOverlaps*width)+10);

      this.$calendarContainer.append($elem);
    },

    findOverlaps: function(index) {
      var current,
          event = this.events[index];

      //console.log(event);

      $.each(this.events, $.proxy(function(idx, current){
        if (idx !== index && idx > index) {
          if (current.start >= event.start && current.start < event.end) {
            //console.log(index, event, idx, current);
            event.forward.push(current);
            current.backward.push(event);
            //console.log('OVERLAP', event, current);
          }
        }
      }, this));
    },

    eventsOverlap: function(event1, event2){
      return (event2.start >= event1.start && event2.start < event1.end);
    },

    findDirectOverlaps: function(event){
      var directOverlaps = 0,
          current = event,
          originalEvent = event;

      while (current.backward.length > 0) {
        //console.log(current, current.backward[0]);
        $.each(current.backward, $.proxy(function(index, evt){
          if (this.eventsOverlap(evt, originalEvent)) {
            directOverlaps+=1;
          }
        }, this));
        current = current.backward[0];
      }

      return directOverlaps;
    }
  }
});

function layOutDay(events) {
  var calendar = new Calendar();
  calendar.init(events);
}

function testLayOutDay() {
  var events = [{start: 60, end: 120}, {start: 30, end: 90}, {start: 70, end: 120}, {start: 40, end: 120},
                {start: 160, end: 210}, {start: 180, end: 300}];

  layOutDay(events);
}

testLayOutDay();
