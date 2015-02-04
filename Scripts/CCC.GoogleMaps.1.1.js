// CCC.GoogleMaps
// 
// Create Google maps using JSON map data.
//
// Copyright (c) 2009 Crystal Creek Consulting
//
// Creation:
// Updates:
//
// To Do:
//      Make markers[] an array of arrays to support multiple maps.
	    
CCC.GoogleMaps = new Class({
    Extends: CCC,

    options: 
    {
        mapInfo: [],
        mapData: []
    },             
    
    // Constructor
    // key: Google maps site key
    // loaderCallbackFunctionName: Name of function the map loader should call upon load completion
    // loadedCallbackFunction: Name of function that should be called when the Google maps library has loaded
    // options: mapInfo and mapData objects can optionally be passed in here
    initialize: function(key, loaderCallbackFunctionName, loadedCallbackFunctionName, options)
    {
        this.parent();
        this.key = key;
        this.loaderCallbackFunctionName = loaderCallbackFunctionName;
        this.loadedCallbackFunctionName = loadedCallbackFunctionName;
        this.setOptions(options);
        this.mapTypes = [];
        this.markers = [];
        this.maps =[];
    },
    
    // Setup that needs to happen prior to loadGMapsLibrary function.
    // The should not be called until the DOM is loaded since it detects the presence of specific <div> tags
    // to dynamically load the Google Maps library.
    initLoader: function()
    {
        // At least one div element must be in the page
        if (this.options.mapInfo.length > 0)
        {
            if ($(this.options.mapInfo[0].mapDivId))
            {
                // Add Google Maps loader
                script = document.createElement("script");
                script.src = "http://www.google.com/jsapi?key=" + this.key + "&callback=" + this.loaderCallbackFunctionName;
                script.type = "text/javascript";
                $(document).getElement("head").appendChild(script);
                $(document.body).set("onunload","GUnload()");
            }
        }            
    },
    
    // Loads the Google Maps library
    loadGMapsLibrary: function()
    {
        // See http://groups.google.com/group/Google-Maps-API/web/javascript-maps-api-versioning for versioning info
        google.load("maps", "2", {"callback" : this.loadedCallbackFunctionName});
    },
    
    // Display an error message
    // div: Div tag that should contain error message
    // msg: Error message
    displayError: function(div, msg)
    {
        div.set("text", msg);
        div.setStyle("color", "#C00000"); 
    },
    
    // Create maps
//    createMaps: function()
//    {
//        // Loop through mapInfo items and create maps
//        this.options.mapInfo.each(function(mapInfoItem, mapInfoIndex){
//            this.createMap(mapInfoItem);
//        }.bind(this));
//    },
    
    // Create a single map
    // mapInfoItem: Information for a map
    createMap: function()
    {
        var mapInfoItem = this.options.mapInfo[0];
        
        // Compatible browser?
        if (GBrowserIsCompatible())
        {
            // Make markerType an array if needed
            if ($chk(mapInfoItem.markerType))
            {
                mapInfoItem.markerType = $splat(mapInfoItem.markerType);
            }
            
            // Create a map
            this.maps[0] = new google.maps.Map2($(mapInfoItem.mapDivId));
            var map = this.maps[0];
            var showLegend = $chk(mapInfoItem.mapLegendDiv);
            var legendHtml = "";
            var mapItem = this.options.mapData.map;
            if ($chk(mapInfoItem.mapType))
            {
                var mapTypeItem = null;
                var mapTypes = $splat(mapItem.mapTypes.mapType);
                for (i = 0; i < mapTypes.length; i++)
                {
                    mapTypeItem = mapTypes[i];
                    if (mapTypeItem.id == mapInfoItem.mapType)
                    {
                        this.mapType = mapTypeItem;
                        map.setCenter(new GLatLng(parseFloat(mapTypeItem.lat),parseFloat(mapTypeItem.lng)), parseInt(mapTypeItem.zoomLevel));
                        if ($chk(mapTypeItem.view))
                        {
                            this.setMapView(map, mapTypeItem.view);
                        }
                        this.mapTypes.push(mapTypeItem);
                        break;
                    }
                }
            }
            else
            {
                map.setCenter(new GLatLng(parseFloat(mapItem.lat),parseFloat(mapItem.lng)), parseInt(mapItem.zoomLevel));
                if ($chk(mapItem.view))
                {
                    this.setMapView(map, mapItem.view);
                }                
            }
            //map.addControl(new GSmallMapControl());
            map.addControl(new GLargeMapControl());
            map.addMapType(G_PHYSICAL_MAP);
            map.addControl(new GMapTypeControl());
            this.map = map;

            // Get marker icon default information
            // Default to 32x32 icon size if not specified in markerTypes tag
            var iconSizeX = 32;
            var iconSizeY = 32;
            var iconXCenter = 16;
            var markerTypesItem = mapItem.markerTypes;
            if (markerTypesItem.iconSizeX != null)
            {
                iconSizeX = markerTypesItem.iconSizeX;
                iconSizeY = markerTypesItem.iconSizeY;
                iconXCenter = iconSizeX / 2;
            }
            
            // Create marker icons
            // Filter marker type list if needed                
            var markerTypes = null;
            if ($chk(mapInfoItem.markerType))
            {
                markerTypes = mapItem.markerTypes.markerType.filter(function(markerTypeItem, markerTypeIndex){
                    var markerTypeList = mapInfoItem.markerType.filter(function(markerTypeListItem, markerTypeListIndex){
                        return markerTypeListItem == markerTypeItem.id;
                    });
                    return (markerTypeList.length != 0);
                });
            }
            else
            {
                markerTypes = $splat(mapItem.markerTypes.markerType)
                //markerTypes = mapItem.markerTypes.markerType;
            }            
            var markerIcons = [];
            markerTypes.each(function(markerTypeItem, markerTypeIndex){
                var icon = new GIcon();
                icon.image = markerTypeItem.icon;
                icon.shadow = markerTypeItem.iconShadow;
                
                // Default icon size if not specified in markerTypes tag
                if (markerTypesItem.iconSizeX == null)
                {
                    icon.iconSize = new GSize(32,32); //GSize(20, 34);
                    icon.shadowSize = new GSize(56,32); //GSize(37, 34);
                    icon.iconAnchor = new GPoint(16,32); //GPoint(9, 34);
                    icon.infoWindowAnchor = new GPoint(16,2); // GPoint(9, 2);
                    icon.infoShadowAnchor = new GPoint(25, 25); // GPoint(18, 25);                        
                }
                else
                {
                    icon.iconSize = new GSize(iconSizeX, iconSizeY);
                    icon.iconAnchor = new GPoint(iconXCenter, iconSizeY);
                    icon.infoWindowAnchor = new GPoint(iconXCenter, 2);
                    icon.infoShadowAnchor = new GPoint(25, 25);                    
                }
                markerIcons.extend([{id: markerTypeItem.id, icon: icon}]);
                
                if (showLegend)
                {
                    legendHtml += "<br /><img src='" + markerTypeItem.icon + "' /> " + markerTypeItem.label;
                }
            });
            
            // Set up marker selection if necessary
            // List items are added in marker creation
            if ($chk(mapInfoItem.markerSelectId))
            {
                var newOption = new Element("option", {
                    value: "All",
                    text: "All"
                });
                newOption.inject($(mapInfoItem.markerSelectId));
            } 
                    
            // Create markers
            var typeItem = null;
            var iconItem = null;
            var icon = null;
            var markers = $splat(mapItem.markers.marker);
            for (i = 0; i < markers.length; i++)
            {
                typeItem = markerTypes.filter(function(markerTypeItem, markerTypeIndex){
                    return markerTypeItem.id == markers[i].type;
                });
                if (typeItem.length != 0)            
                {                
                    if ($chk(typeItem[0].infoWindow))
                    {
                        $extend(markers[i], {infoWindow: typeItem[0].infoWindow});
                    }
                }
                iconItem = markerIcons.filter(function(markerIconItem, markerIconIndex){
                    return markerIconItem.id == markers[i].type;
                });
                if (iconItem.length != 0)            
                {
                    icon = iconItem[0].icon;
                    this.addMarker(map, mapInfoItem, markers[i], icon);                
                }
            }
            
            // Create legend
            if (showLegend)
            {
                $(mapInfoItem.mapLegendDiv).set("html", $(mapInfoItem.mapLegendDiv).get("html") + legendHtml);    
            }
        }
        
        // Incompatible browser
        else
        {
            // Use a callback function instead so developer can control error handling?
            this.displayError($(mapInfoItem.mapDivId), "Your browser is not compatible with Google Maps");
        }
    },
    
    changeMapType: function(mapType)
    {
        var mapInfoItem = this.options.mapInfo[0];
        var map = this.maps[0];
        var mapItem = this.options.mapData.map;        
        if ($chk(mapInfoItem.mapType))
        {
            var mapTypeItem = null;
            var mapTypes = $splat(mapItem.mapTypes.mapType);
            for (i = 0; i < mapTypes.length; i++)
            {
                mapTypeItem = mapTypes[i];
                if (mapTypeItem.id == mapType)
                {
                    this.mapType = mapTypeItem;
                    map.setCenter(new GLatLng(parseFloat(mapTypeItem.lat),parseFloat(mapTypeItem.lng)), parseInt(mapTypeItem.zoomLevel));
                    if ($chk(mapTypeItem.view))
                    {
                        this.setMapView(map, mapTypeItem.view);
                    }
                    return true;
                }
            }
            return false;
        }
        else
        {
            return false;
        }   
    },
  
    // Add a marker to a map
    // map: Pointer to a map
    // mapInfoItem: Information for a map
    // markerItem: Marker data item
    // icon: Marker icon
    addMarker: function(map, mapInfoItem, markerItem, icon)
    {
        // Create and add marker
        var point = new GLatLng(markerItem.lat, markerItem.lng);
        var marker = new GMarker(point, new GIcon(icon));
        marker.id = markerItem.id;
        marker.markerType = markerItem.type;
        marker.markerItem = markerItem;        
        if ($chk(markerItem.clickHandler)) GEvent.addListener(marker, "click", function(){
            markerItem.clickHandler(this, markerItem);
        });
        map.addOverlay(marker);
        this.markers.push(marker);
                
        // Hide marker if necessary
        // markerItem visibility is potentially set in addMarker of parent class
        if (markerItem.visible == false)
        {
            marker.hide();
        }
        
        // Recenter map if a markerName was passed in
        var selectedMarker = false;
        if ($chk(mapInfoItem.markerId))
        {
            if (mapInfoItem.markerId == markerItem.id)
            {
                map.setCenter(new GLatLng(parseFloat(markerItem.lat),parseFloat(markerItem.lng)), 15);            
                selectedMarker = true;
            }
            else
            {
                marker.hide();
            }
        }
        else
        {
            if ($chk(mapInfoItem.markerType))
            {
                var markerShow = mapInfoItem.markerType.filter(function(markerTypeItem, markerTypeIndex){
                    return markerTypeItem == marker.markerType;
                });                
                //if (mapInfoItem.markerType != markerItem.type)
                if (markerShow.length == 0)
                {
                    marker.hide();
                }            
            }
        }
        
        // Add to selection list if needed
        if ($chk(mapInfoItem.markerSelectId))
        {
            if (!marker.isHidden())
            {          
                var newOption = new Element("option", {
                    value: markerItem.id,
                    text: markerItem.title
                });
                if (selectedMarker)
                {
                    newOption.selected = "selected";
                    GEvent.trigger(marker, 'click');
                }
                newOption.inject($(mapInfoItem.markerSelectId));
            }
        }         
    },
    
    // Select all markers or a specific marker on the map
    selectMarker: function(markerId)
    {
        this.map.getInfoWindow().hide(); //closeInfoWindow()
        
        // Show all markers
        if (markerId == "All")
        {
            //this.map.setZoom(parseInt(this.mapType.zoomLevel));
            this.map.setCenter(new GLatLng(parseFloat(this.mapType.lat),parseFloat(this.mapType.lng)), parseInt(this.mapType.zoomLevel));
            if ($chk(this.mapType.view))
            {
                this.setMapView(this.map, this.mapType.view);
            }            
            if ($chk(this.options.mapInfo[0].markerType))
            {
                var markerTypes = this.options.mapInfo[0].markerType;
                //markerTypes.each(function(markerTypeItem, markerTypeIndex){
                //var markerType = this.options.mapInfo[0].markerType;
                for (i = 0; i < this.markers.length; i++)
                {
                    for (j = 0; j < markerTypes.length; j++)
                    {
                        if (this.markers[i].markerType == markerTypes[j])
                        {
                            this.showMarker(this.markers[i]);
                        }
                    }
                }
            }
            else
            {
                for (i = 0; i < this.markers.length; i++)
                {
                    this.showMarker(this.markers[i]);
                }
            }
        }
        
        // If a specific id, hide all other markers and recenter map on marker
        else
        {
            for (i = 0; i < this.markers.length; i++)
            {
                if (this.markers[i].id == markerId)
                {
                    this.map.panTo(this.markers[i].getLatLng());
                    this.map.setZoom(16);
                    this.markers[i].show();
                    GEvent.trigger(this.markers[i], 'click'); 
                }
                else
                {
                    this.markers[i].hide();
                }
            }
        }
    },
    
    // Show a marker
    // This function can be overridden to have map-specific conditions for showing a marker
    showMarker: function(marker)
    {
        marker.show();
    },
    
    // Refresh visibility of map markers
    // This currently does not check markerType
    refreshMapMarkers: function()
    {
        this.maps[0].closeInfoWindow();
        for (i = 0; i < this.markers.length; i++)
        {
            this.showMarker(this.markers[i]);
        }    
    },

    // Refresh selection list if one exists
    // This currently does not check markerType    
    refreshSelectionList: function()
    {
        // Add to selection list if needed
        var mapInfoItem = this.options.mapInfo[0];        
        if ($chk(mapInfoItem.markerSelectId))
        {
            // Clear list and add All option
            $(mapInfoItem.markerSelectId).empty();
            var newOption = new Element("option", {
                value: "All",
                text: "All"
            });
            newOption.inject($(mapInfoItem.markerSelectId)); 
                       
            var marker;
            for (i = 0; i < this.markers.length; i++)
            {        
                marker = this.markers[i];
                if (!marker.isHidden())
                {          
                    newOption = new Element("option", {
                        value: marker.markerItem.id,
                        text: marker.markerItem.title
                    });
    //                if (selectedMarker)
    //                {
    //                    newOption.selected = "selected";
    //                    GEvent.trigger(marker, 'click');
    //                }
                    newOption.inject($(mapInfoItem.markerSelectId));
                }
            }              
        }      
    },
    
    // Set the view of the map
    // map: Pointer to a map
    // view: View type
    setMapView: function(map, view)
    {
        switch(view)
        {
            case "Satellite": map.setMapType(G_SATELLITE_MAP);break;
            case "Hybrid": map.setMapType(G_HYBRID_MAP);break;
            case "Terrain": map.setMapType(G_PHYSICAL_MAP);break;
            default: map.setMapType(G_NORMAL_MAP);
        }
    }, 
    
    // Add map to array
    // map: JSON map information
    addMap: function(map)
    {
        this.options.mapInfo.extend(map);
    }
    
});
