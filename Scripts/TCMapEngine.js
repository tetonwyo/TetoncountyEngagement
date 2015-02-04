	var map;

	var mapData;

	var mapTypes;
	var markerTypes = [];
	var mapMarkers = [];
	var infoWindows = [];
	var currentInfoWindow = null;
	
	var markerIcons = {
		plaque : '/images/maps/histpresPlaque.png',
		listed : '/images/maps/histpresFlag.png',
		surveyed : '/images/maps/histpresSurvey.png'
	};
	
	jQuery(document).ready(function(){
	
		InitializeMap();

		LoadMapData();
		
		jQuery("#propertyGroup").change(function() {
			ChangeFilter();	
		});
		
		jQuery("#propertySelect").change(function() {
			ZoomToProperty();
		});
	});

	function ZoomToProperty()
	{
		var property = jQuery("#propertySelect option:selected").text();
		
		if (property=="All Properties")
		{
			ChangeFilter();
		}
		else
		{
			for(i=0;i<mapMarkers.length;i++)
			{
				if (mapMarkers[i].title==property)
				{
					map.setCenter(mapMarkers[i].position);
					map.setZoom(18);
					google.maps.event.trigger(mapMarkers[i], 'click', mapMarkers[i].position);
				}
			}
		}
	}
	
	function ChangeFilter()
	{
		ClearMap();

		var filter = jQuery("#propertyGroup option:selected").text();

		//set appropriate zoom & center
		map.setCenter(new google.maps.LatLng(mapData.lat,mapData.lng));
		
		if (filter=="Jackson")
			map.setZoom(15);
		else if (filter=="Teton County")
			map.setZoom(9);
		
		ShowMarkers(filter);
	
	}
	
	
	function ClearMap()
	{
		//clear property select list
		jQuery('#propertySelect').empty();
		jQuery("<option value='All'>All Properties</option>").appendTo("#propertySelect");
	
		for (i=0;i<mapMarkers.length;i++)
		{
			mapMarkers[i].setMap(null)
		}
	}

	function ShowMarkers(filter)
	{
		
		var markers = mapData.markers.marker;
		var showMarker = true;
	
		for (i=0;i<markers.length;i++)
		{
			var marker = markers[i];
			
			//process filters
			if (filter)
			{
				if (filter=="Jackson")
					showMarker = (marker.jackson=="true");
				else if (filter=="Teton County")
					showMarker = (marker.county=="true");
				else if (filter=="Federal")
					showMarker = (marker.federal=="true");
			}
			
			if (showMarker) 
			{
				var iconImages = '';
				if (marker.plaque=="true")
					iconImages += '<img src=' + markerIcons.plaque + '>';
				else if (marker.survey=="true")
					iconImages += '<img src=' + markerIcons.surveyed + '>';
				else if (marker.nrhp=="true")
					iconImages += '<img src=' + markerIcons.listed + '>';
				
				if (iconImages != '')
				{
					iconImages = '<p>' + iconImages + '</p>';
				}				
				
				mapMarkers[i] = new google.maps.Marker({
				  position: new google.maps.LatLng(marker.lat,marker.lng),
				  map: map,
				  icon: markerTypes[marker.type],
				  title: marker.title
				});
			
				infoWindows[i] = '<h2>' + marker.title + '</h2>' + iconImages + marker.location + '<br/>' + marker.description;
				
				//fill out property select list
				jQuery("<option value='" + marker.title + "'>" + marker.title + "</option>").appendTo("#propertySelect");
			}
  			
		}
		for (i=0;i<mapMarkers.length;i++)
		{
				updateMarkerInfo(mapMarkers[i],infoWindows[i]);
		}
	}
	
	function updateMarkerInfo(marker, html)
	{
		if (marker)
		{
			google.maps.event.addListener(marker, 'click', function() {
				if (currentInfoWindow)
					currentInfoWindow.close();
				
				currentInfoWindow = new google.maps.InfoWindow({content: html, maxWidth: 300});
				currentInfoWindow.open(map,marker);
			});			
		}
	}
	
	function LoadMapTypes(maptypes)
	{
	}
	
	function LoadMarkerTypes(markertypes)
	{
		//currently on 1 marker type - the house icon
		markerTypes[markertypes.id] = markertypes.icon;
	}
	
	function LoadMapData()
	{
		jQuery.getJSON('/maps/HistPresMapData.txt', function(data) {
			mapData = data.map;
			
			InitializeMap(mapData.lat,mapData.lng,parseInt(mapData.zoomLevel));

			LoadMarkerTypes(mapData.markerTypes.markerType);
			
			jQuery("#propertyGroup").val("Jackson")
			ShowMarkers("Jackson");
		});
	}

      function InitializeMap(lat,lng,zoom) {
        var mapOptions = {
          center: new google.maps.LatLng(lat,lng),
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      }
