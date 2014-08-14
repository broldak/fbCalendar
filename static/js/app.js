var Calendar = (function(){
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

    addToDom: function() {
      $.each(this.events, $.proxy(function(index, event){
        this.createDomElement(event);
      }, this));
    },

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
  var events = [{start: 30, end: 90}, {start: 60, end: 120}, {start: 300, end: 360}];

  layOutDay(events);
}

testLayOutDay();
