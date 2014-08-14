var Calendar = (function(){
  //default dom element with sample data
  var domElement = '<div class="calendar-event">' +
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
        this.createDomElement(event);
      }, this));
    },

    //TODO: add checking for overlaps, etc.
    //adds element to the DOM.
    createDomElement: function(event){
      var $elem = $(domElement),
          top = event.start + 'px',
          height = event.end - event.start + 'px';

      $elem.css('top', top);
      $elem.css('height', height);

      this.$calendarContainer.append($elem);
    }
  }
});

function layOutDay(events) {
  var calendar = new Calendar();
  calendar.init(events);
}

function testLayOutDay() {
  var events = [{start: 60, end: 120}, {start: 300, end: 360}, {start: 30, end: 90}];

  layOutDay(events);
}

testLayOutDay();
