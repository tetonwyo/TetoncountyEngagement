// ------------------------------------------------------------------------------------------------
// tcHistPresPropertyList.js
// Supporting script for Historical Preservation property list page
//
// © 2010 Crystal Creek Consulting
//
// Created: 05/17/10, MWD
// Updates:


// Property list class
// Creates property list page information using JSON map data
CCC.PropertyList = new Class({
    Extends: CCC,

    options: 
    {
        xml: null,
        propertyData: []
    },
    
    // Loads property data from an XML file
    // fileName: Map file name
    load: function(fileName)
    {    
        // TODO: error message if file not found?
        this.options.xml = new JKL.ParseXML(fileName);
        this.options.propertyData = this.options.xml.parse();
    },
    
    // Loads property data for a specific group value into a div
    // divID: Div tag id
    // groupValue: Group value to show
    changePropertyGroup: function(divID, groupValue)
    {
        if ($chk(this.options.propertyData.map.markers))
        {
            var groupAttribute;
            switch (groupValue)
            {
                case "Jackson": groupAttribute = "jackson"; break;
                case "Teton County": groupAttribute = "county"; break;
                case "Federal": groupAttribute = "federal"; break;
                default: groupAttribute = ""; break;
            }
            var html = "<table>";
            var markerItem;
            var markers = $splat(this.options.propertyData.map.markers.marker);
            for (i = 0; i < markers.length; i++)
            {
                markerItem = markers[i];
                if (markerItem[groupAttribute] == "true")
                {
                    //html += "<div style='padding-top: 10px;'>";
                    html += "<tr><td style='padding-right:5px;padding-top:10px;width:80px;'>";
                    //html += "<div style='float:left; padding-right: 4px; width: 80px; height: 75px; border: 1px solid black;'>";
                    if ($chk(markerItem.img))
                    {
                        html += "<img style='height:75px;width:75px;' src='" + markerItem.img + "' height='75px' width='75px' alt='" + markerItem.title + "' title='" + markerItem.title + "' />";
                    }
                    html += "</td><td style='padding-top:10px;'><h2>" + markerItem.title + "</h2>";
                    if ($chk(markerItem.location))
                    {
                        html += "Location: " + markerItem.location + "<br />";
                    }
                    if ($chk(markerItem.description))
                    {
                        html += markerItem.description + "<br />";
                    }
                    html += "<div style='overflow:hidden'>";
                    if (markerItem.plaque == "true")
                    {
                        html += "<img src='/images/maps/histpresPlaque.png' style='float:left; padding:1px;' alt='Received Teton County Historic Preservation Board Award Plaque' title='Received Teton County Historic Preservation Board Award Plaque' height='16px' width='16px'/>";
                    }        
                    if (markerItem.survey == "true")
                    {
                        html += "<img src='/images/maps/histpresSurvey.png' style='float:left; padding:1px' alt='Surveyed by the Teton County Historic Preservation Board' title='Surveyed by the Teton County Historic Preservation Board' height='16px' width='16px' />";
                    }  
                    if (markerItem.nrhp == "true")
                    {
                        html += "<img src='/images/maps/histpresFlag.png' style='float:left; padding:1px' alt='Listed in the National Register of Historic Places' title='Listed in the National Register of Historic Places' height='16px' width='16px' />";
                    }          
                    html += "</div><div style='clear:left'>";
                    if ($chk(markerItem.moreInfoLink))
                    {
                        html += "<a href='" + markerItem.moreInfoLink + "' target='_blank'>More information...</a><br />";
                    }
                    html += "<a href='http://maps.google.com/maps?daddr=" + markerItem.lat + "," + markerItem.lng + "' target='_blank'>Get directions...</a>";
                    html += "</td></tr>";
                }
            }
            html += "</table>";
            $(divID).set("html", html);
        }
        else
        {
            this.displayError($(divID), "No properties found for " + groupValue);
        }    
    },
    
    // Display an error message
    // div: Div tag that should contain error message
    // msg: Error message
    displayError: function(div, msg)
    {
        div.set("text", msg);
        div.setStyle("color", "#C00000"); 
    }    
});     

var propertyList = new CCC.PropertyList();
window.addEvent("domready", function() {
    propertyList.load('/Maps/HistPresMapData.xml');
    propertyList.changePropertyGroup('propertyList','Jackson');
});    