angular.module('selfboss.directives', [])


 

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      
	  
	   // pos.coords.latitude, pos.coords.longitude
	  
	    
	  function initialize() {
		  
     var options = {  
      zoom: 14,  
      center: new google.maps.LatLng(-20.321008, -40.337257),  
      mapTypeId: google.maps.MapTypeId.ROADMAP  
    };
      
    // Creating the map  
    var map = new google.maps.Map($element[0], options);
    
    // Creating a LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    
    // Creating an array that will contain the coordinates 
    // for New York, San Francisco, and Seattle
    var places = [];
    
    // Adding a LatLng object for each city
    places.push(new google.maps.LatLng(-20.4670574, -54.6117525));
    places.push(new google.maps.LatLng(-20.4571261, -54.6273737));
	places.push(new google.maps.LatLng(-20.4552363, -54.6166019));
     
    
    // Creating a variable that will hold 
    // the InfoWindow object
    var infowindow;
    var recycle = new google.maps.MarkerImage('img/recycle.png');
 	var shadow = new google.maps.MarkerImage('img/shadow.png', null, null, new google.maps.Point(16, 35));
 	
    // Looping through the places array
    for (var i = 0; i < places.length; i++) {
      
	  
	  
	  
      // Adding the markers
      var marker = new google.maps.Marker({
        position: places[i], 
        map: map,
		icon: recycle,
		shadow: shadow,
        title: 'Place number ' + i
      });
            
      // Wrapping the event listener inside an anonymous function 
      // that we immediately invoke and passes the variable i to.
      (function(i, marker) {
        
        // Creating the event listener. It now has access to the values of
        // i and marker as they were during its creation
        google.maps.event.addListener(marker, 'click', function() {
          
          // Check to see if we already have an InfoWindow  
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          }
          
          // Setting the content of the InfoWindow
          infowindow.setContent('Place number ' + i);
          
          // Tying the InfoWindow to the marker 
          infowindow.open(map, marker);
          
        });
        
      })(i, marker);
      
      // Extending the bounds object with each LatLng
      bounds.extend(places[i]);
    
    }
    
    // Adjusting the map to new bounding box
    //map.fitBounds(bounds)
    $scope.onCreate({map: map});

        
		  
		  
		  
		  /* 
	  
         
	    var myLatlng = new google.maps.LatLng(43.07493, -89.381388);
 		var mapOptions = {
           center: myLatlng,
           zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 		
        var map = new google.maps.Map($element[0], mapOptions);
 		var image = 'img/icon.png';
 		var beachMarker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				//icon: image,
				animation: google.maps.Animation.DROP 
 		  });
 		  
		var infoWindow = new google.maps.InfoWindow({
		content:'<div class="info">Hello world</div>'
		//content: 'Some text',
		//position: myLatlng
		 });
  
         $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'click', function (e) {
			
			infoWindow.open(map, beachMarker);
			
          e.preventDefault();
          return false;
        });
      
	  
	  
	  
	  
	  
	  */}
	
	
	 
	  
	  
	  
	  

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
	  
	  
	  
	  
	  
	  
	  
	  
	  
    }
  }
});
