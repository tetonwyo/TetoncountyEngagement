// CCC.GoogleMaps.TC
// 
// Create Google maps using JSON map data on Teton County website.  Wrapper for CCC.GoogleMaps class.
//
// Copyright (c) 2009 Crystal Creek Consulting
//
// Creation:
// Updates:

CCC.GoogleMaps.TC = new Class({
    Extends: CCC.GoogleMaps,
    
    // Constructor
    // key: Google maps site key
    // options: mapInfo and mapData objects can optionally be passed in here
    initialize: function(key, options)
    {
        this.currentMapInfoItem = null;
        this.parent(key, "GoogleMapsLoaderCallback", "GoogleMapsLoadedCallback", options);
    },
    
    // Setup that needs to happen prior to the CCC.GoogleMaps.loadGMapsLibrary function.
    // The should not be called until the DOM is loaded since it detects the presence of specific <div> tags
    // to dynamically load the Google Maps library.
    initLoader: function()
    {
        // At least one div element must be in the page
        if (this.options.mapInfo.length > 0)
        {
            if ($(this.options.mapInfo[0].mapDivId))
            {
                // Add XML to JSON parser
                // *** this should be moved to TC and proabably should be inserted somewhere besides the <head>
                var script = document.createElement("script");
                script.src = "/Scripts/jkl-parsexml.js";
                script.type = "text/javascript";
                $(document).getElement("head").appendChild(script);
            }
        }
        this.parent();    
    },

    // Loads and creates maps
    // mapInfoItem: Information for a map    
    createMap: function(mapInfoItem)
    {
        // Get the map data
        var mapInfoItem = this.options.mapInfo[0];
        this.currentMapInfoItem = mapInfoItem;
        var xml = new JKL.ParseXML(mapInfoItem.mapFile);
        this.options.mapData = xml.parse();
        if ($chk(this.options.mapData.map))
        {
            this.parent();
        }
        else
        {
            this.displayError($(this.currentMapInfoItem.mapDivId), "Error loading " + this.currentMapInfoItem.mapFile);
        }
    },

    // Add a marker to a map
    // map: Pointer to a map
    // mapInfoItem: Information for a map
    // markerItem: Marker data item
    // icon: Marker icon
    addMarker: function(map, mapInfoItem, markerItem, icon)
    {
        // Add a clickHandler depending on marker type
        switch(markerItem.type)
        {
            case "park": $extend(markerItem, {clickHandler: this.onParkClick});break;
            case "sports": $extend(markerItem, {clickHandler: this.onSportsClick});break;            
            case "countyWeather": 
            case "otherWeather": $extend(markerItem, {clickHandler: this.onWeatherClick});break;
            case "webcam": $extend(markerItem, {clickHandler: this.onWebcamClick});break;
        }            
        this.parent(map, mapInfoItem, markerItem, icon);
    },
    
    // Click handler for a park marker
    // marker: Map marker
    // markerItem: Marker data item
    onParkClick: function(marker, markerItem)
    {
        var html = "<h1 class='gMapInfoWindow'>" + markerItem.title + "</h1><div>";
        if ($chk(markerItem.img))
        {
            html += "<div style='float:left; padding-right: 4px'><img src='" + markerItem.img + "' height='75px' width='75px' /></div>";
        }
        if ($chk(markerItem.description))
        {
            html += markerItem.description;
        }
        if ($chk(markerItem.moreInfoLink))
        {
            html += "<br /><br /><a href='" + markerItem.moreInfoLink + "'>More Information</a>";
        }
        html += "<br /><br /><a href='http://maps.google.com/maps?daddr=" + markerItem.lat + "," + markerItem.lng + "' target='_blank'>Get directions...</a>";
        html += "</div>";
        marker.openInfoWindowHtml(html, {maxWidth: 300});
    },
    
    // Click handler for a sports field marker
    // marker: Map marker
    // markerItem: Marker data item
    onSportsClick: function(marker, markerItem)
    {
        var html = "<h1 class='gMapInfoWindow'>" + markerItem.title + "</h1><div>";
        if ($chk(markerItem.img))
        {
            html += "<div style='float:left; padding-right: 4px'><img src='" + markerItem.img + "' height='75px' width='75px' /></div>";
        }
        if ($chk(markerItem.description))
        {        
            html += markerItem.description;
        }
        if ($chk(markerItem.moreInfoLink))
        {
            html += "<br /><br /><a href='" + markerItem.moreInfoLink + "'>More Information</a>";
        }
        html += "<br /><br /><a href='http://maps.google.com/maps?daddr=" + markerItem.lat + "," + markerItem.lng + "' target='_blank'>Get directions...</a>";
        html += "</div>";
        marker.openInfoWindowHtml(html, {maxWidth: 300});
    },    
    
    // Click handler for a webcam marker
    // marker: Map marker
    // markerItem: Marker data item
    onWebcamClick: function(marker, markerItem)
    {
        var html = "<h1 class='gMapInfoWindow'>" + markerItem.title + "</h1><div>";
        if ($chk(markerItem.img))
        {
            html += "<div style='float:left; padding-right: 4px'><img src='" + markerItem.img + "' height='75px' width='75px' /></div>";
        }
        if ($chk(markerItem.description))
        {        
            html += markerItem.description;
        }
        if ($chk(markerItem.moreInfoLink))
        {
            html += "<br /><br /><a href='" + markerItem.moreInfoLink + "' target='_blank'>More Information</a>";
        }
        html += "</div>";
        marker.openInfoWindowHtml(html, {maxWidth: 300});
    },
    
    // Click handler for a weather marker
    // marker: Map marker
    // markerItem: Marker data item    
    onWeatherClick: function(marker, markerItem)
    {
        var html = "<h1 class='gMapInfoWindow'>" + markerItem.title + "</h1><div>";
        
        // Additional links for popup
        var popupLinks = "";
        if ($chk(markerItem.detailLink))
        {
            popupLinks = "<br /><a href='" + markerItem.detailLink + "'>Detailed Weather</a>";
        }
        if ($chk(markerItem.infoLink))
        {
            popupLinks += "<br /><a href='" + markerItem.infoLink + "'>Station Information</a>";
        }
        if (popupLinks != "")
        {
            popupLinks = "<br />" + popupLinks;
        }
        
        // Request the station's XML weather data
        var now = new Date();
        var req = new Request({url: markerItem.dataLink + "?" + now.getTime(), method:"get", 
            onSuccess: function(responseText, responseXml)
            {
                try
                {
                    var br = "<br />"
                    var tag = responseXml.getElementsByTagName("weather")[0];
                    var now = new Date();
                    var time = tag.getAttribute("time");
                    if (time == null)
                    {
                        html += "<span style='color:#ff0000'>No weather data</span>";
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
                        // to properly format the time
                        time = time.replace("a"," AM");
                        time = time.replace("p"," PM");
                        
                        // Highlight date if observation time is > 24 hours ago
                        var obs = Date.parse(weatherDate + " " + time);
                        if (((now - obs)/1000/60/60) < 24)
                        {
                            html += "Observation: " + weatherDate + " " + time + br;
                        }
                        else
                        {
                            html += "<span style='color:#ff0000'>Observation: " + weatherDate + " " + time + "</span>" + br;
                        }
                        
                        // Observation data
                        if (tag.getAttribute("temp") != null) html += "Temperature: " + tag.getAttribute("temp") + br;
                        if (tag.getAttribute("humidity") != null) html += "Humidity: " + tag.getAttribute("humidity") + br;
                        if (tag.getAttribute("windSpeed") != null) html += "Wind: " + tag.getAttribute("windSpeed") + " " + tag.getAttribute("windDirection") + br;
                        if (tag.getAttribute("dewpoint") != null) html += "Dewpoint: " + tag.getAttribute("dewpoint") + br;
                        if (tag.getAttribute("barometer") != null) 
                        {
                            html += "Pressure: " + tag.getAttribute("barometer");
                            if (tag.getAttribute("ThreeHourBarometerTrend") != null) html += ", " + tag.getAttribute("ThreeHourBarometerTrend");
                        }
                    }
                }
                
                // Data error
                catch(e)
                {
                    html += "<span style='color:#ff0000'>Invalid station data</span>";
                }
        
                // Show the information
                html += "<br />" + popupLinks + "</div>";
                marker.openInfoWindowHtml(html);
            },
            
            onFailure: function(err)
            {
                html += "<span style='color:#ff0000'>Weather request failed - " + err.status + "</span>"
                html += "<br />" + popupLinks + "</div>";
                marker.openInfoWindowHtml(html);
            }
        });
        req.send();    
    }
});    

// *****this should be in the header of all TC pages.
// Google Maps loader is dynamically loaded in initLoader if maps have been added.
// The Google Maps loader does a callback to a function that should call loadGMapsLibrary.
// The Google Maps library does a callback to a function once it is loaded.
var mapsTC = new CCC.GoogleMaps.TC("ABQIAAAAQ80Irx6XGc2Oq5qWe_-IlRRAaAOjDhK_oEc32q4Nrm4MwcG1ihSz_wTG6C-hf_v2LmbUE5KTkEPvog");

function GoogleMapsLoaderCallback()
{
    mapsTC.loadGMapsLibrary();
}

function GoogleMapsLoadedCallback()
{
    mapsTC.createMap();
}
window.addEvent("domready", function() {
    mapsTC.initLoader();
});    

