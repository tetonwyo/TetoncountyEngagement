// ------------------------------------------------------------------------------------------------
// tcHome.js
// Supporting script for default.aspx (Teton County home page)
//
// © 2010 Crystal Creek Consulting
//
// Created: 04/27/09, MWD
// Updates:

// Slideshow photo list
window.addEvent('domready', function() {
    var data = {
      'flood1.jpg': { 'caption': 'FLOOD AWARENESS WEEK. This photo is from the 2010 Spring flood.' },
      'flood2.jpg': { 'caption': 'FLOOD AWARENESS WEEK. This photo is from the 2010 Spring flood.' },
      'flood3.jpg': { 'caption': 'FLOOD AWARENESS WEEK. This photo is from the 2010 Spring flood.' }

    }
    var myShow = new Slideshow.Fader('slideshowPanel', data,{ hu: '/images/slideshow/', width: 465, height: 300, captions: true, controller: false, delay: 3000, duration: 3000, resize: false, thumbnails: false });
});
        
// Parse calendar events XML file and return HTML list
function ParseCalendarEventsXml(xml)
{
    var html = "<ul>";
    try
    {
        var events = xml.getElementsByTagName("event");
        if (events.length == 0)
        {
            html += "<li>No events found</li>"
        }
        else
        {                
            var title;
            var url;
            for (i = 0; i < events.length; i++)
            {
                title = events[i].getAttribute("title");
                url = events[i].getAttribute("url");
                if (url == "")
                {
                    html += "<li>" + title + "</li>";
                }
                else
                {
                    html += "<li><a href='" + url + "'>" + title + "</a></li>"
                }
            } 
            return html;
        }
    }
    catch(e)
    {
        html +=  "<li>XML parsing error</li>";
    }
    html += "</ul>";
    return html;
}

// Request calendar events from server and populate calendar events panel
function GetCalendarEvents(calendar, eventName)
{   
    $('calendarEvents').set('html', "<ul><li>Retrieving events...</li></ul>");
    var selectedDate = calendar.getSelectedDate();
    var dataFile = '/data/GetCalendarEvents.aspx?eventStartDay=' + selectedDate.getDate() + '&eventStartMonth=' + (selectedDate.getMonth() + 1) + '&eventStartYear=' + selectedDate.getFullYear(); //alert(selectedDate);
    var req = new Request({url:dataFile, method:"get", 
        onSuccess: function(responseText, responseXml) {
            var eventsHtml = ParseCalendarEventsXml(responseXml);
            $('calendarEvents').set('html', eventsHtml);
        },
        onFailure: function(err) {
            $('calendarEvents').set('html', "<ul><li>Calendar request failed - " + err.status + "</li></ul>");
        }
     });
    req.send();             
}
