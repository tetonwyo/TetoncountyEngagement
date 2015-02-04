// ------------------------------------------------------------------------------------------------
// tcWeather.js
// Supporting script for weather information
//
// © 2010 Crystal Creek Consulting
//
// Created: 05/10/10, MWD
// Updates:

function GetWeatherStations(dataFileName, stationListId, dataPanelId)
{
    var now = new Date();
    var req = new Request({ url: dataFileName + "?" + now.getTime(), method: "get",
        onSuccess: function (responseText, responseXml) {
            var stations = responseXml.getElementsByTagName("station");
            for (var i = 0; i < stations.length; i++) {
                if (stations[i].getAttribute("frontBanner") == "true") {
                    jQuery(stationListId).append(jQuery("<option></option>").attr("value", stations[i].getAttribute("dataLink")).text(stations[i].getAttribute("label")));
                }
            }
	    jQuery(stationListId + ' option:first').remove();
            GetCurrentWeather(stationListId, dataPanelId);
        },
        onFailure: function (err) {
            jQuery(dataPanelId).html("Weather request failed - " + err.status);
        }
    });
    req.send();
}
function GetCurrentWeather(stationListId, dataPanelId)
{
    jQuery(dataPanelId).html("");

    var selected = jQuery(stationListId + ' option:selected'); // (stationListId).getSelected();
    var dataFile = selected.val(); // selected.getProperty('value');

    var now = new Date();
    var req = new Request({url:dataFile + "?" + now.getTime(), method:"get", 
        onSuccess: function(responseText, responseXml) {
            var weatherHtml = ParseCurrentWeatherXml(responseXml);
            jQuery(dataPanelId).html(weatherHtml);
        },
        onFailure: function(err) {
           jQuery(dataPanelId).html("Weather request failed - " + err.status);
        }
     });
    req.send();            
}

function ParseCurrentWeatherXml(xml)
{
    var br = "<br />";
    try
    {
        var tag = xml.getElementsByTagName("weather")[0];
        var now = new Date();
        var time = tag.getAttribute("time");
        if (time == null)
        {
            return "<span style='color:#ff0000'>No weather data</span>"
        }
        else
        {                
            var weatherDate = tag.getAttribute("weatherDate");
                
            // Since TC weather station exports use a two-digit date, append '20' to make it 4-digit
            var splitDate = weatherDate.split("/");
            if (splitDate.length == 3)
            {
                if (splitDate[2].length == 2)
                {
                    splitDate[2] = "20" + splitDate[2];
                    weatherDate = splitDate.join("/");
                }
            }
                                
            // Since TC weather station exports use 'a' or 'p' on times, replace with 'AM' or 'PM' 
            //to properly format the time
            time = time.replace("a"," AM");
            time = time.replace("p"," PM");                

            var obs = Date.parse(weatherDate + " " + time);
            var html;
            if (((now - obs)/1000/60/60) < 24)
            {
                html = weatherDate + " " + time + br;
            }
            else
            {
                html = "<span style='color:#ff0000'>" + weatherDate + " " + time + "</span>" + br;
            }
            if (tag.getAttribute("temp") != null) html = html + "Temperature: " + tag.getAttribute("temp") + br;
            if (tag.getAttribute("humidity") != null) html = html + "Humidity: " + tag.getAttribute("humidity") + br;
            if (tag.getAttribute("windSpeed") != null) html = html + "Wind: " + tag.getAttribute("windSpeed") + " " + tag.getAttribute("windDirection") + br;
            //html = html + "Dewpoint: " + tag.getAttribute("dewpoint") + br;
            if (tag.getAttribute("barometer") != null) 
            {
                html = html + "Pressure: " + tag.getAttribute("barometer");
                if (tag.getAttribute("ThreeHourBarometerTrend") != null) html = html + ", " + tag.getAttribute("ThreeHourBarometerTrend");
            }
            return html;
        }
    }
    catch(e)
    {
        return "XML parsing error";
    }
}  