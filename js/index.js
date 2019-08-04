$(document).ready(function() {

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        navLinks: true,
        eventLimit: false,
        defaultView: "agendaWeek",
        eventSources: [{
            url: '../data/data-f1host.json',
            type: 'GET'
        },{
            url: '../data/data-51talk.json',
            type: 'GET'
        }],
        timeFormat: "H:mm",
        defaultView: 'agendaWeek',
        nowIndicator: true,
        eventRender: function (event, element, view) {
            $(element).each(function () {
                $(this).attr('date-num', event.start.format('YYYY-MM-DD'));
            });
        },
        eventAfterAllRender: function(view){
            for( cDay = view.start.clone(); cDay.isBefore(view.end) ; cDay.add(1, 'day') ){
                var dateNum = cDay.format('YYYY-MM-DD');
                var dayEl = $('.fc-day-top[data-date="' + dateNum + '"]');
                var dayHeader = $('.fc-day-header[data-date="' + dateNum + '"]');
                var eventCount = $('.fc-event[date-num="' + dateNum + '"]').length;
                if (eventCount) {
                    var unit = eventCount > 1 ? " events" : " event";
                    var html = '<span class="event-count">&nbsp;' +
                                '<i>' +
                                eventCount +
                                '</i>' +
                                unit +
                                '</span>';
                    dayEl.append(html);

                    var header = dayHeader.children().text() + ' (' + eventCount + unit + ')';
                    dayHeader.children().text(header);
                }
            }
        }
    });

});
