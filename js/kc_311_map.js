
// initialize the map
var map = new L.Map('map');

// configure the map settings
var mapUrl = 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
    mapAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles By <a href="http://stamen.com">Stamen</a>',
    mapInfo = new L.TileLayer(mapUrl, {maxZoom: 18, attribution: mapAttrib});

// set a default location for the map
var oakland = new L.LatLng(37.778149,-122.225563); // geographical point (longitude and latitude)
map.setView(oakland, 14).addLayer(mapInfo);
var open_cases_list = [];
var marker_orange = new L.icon({iconUrl: 'images/marker_orange.png'});
var marker_blue = new L.icon({iconUrl: 'images/marker_blue.png'});

// get issues
$.getJSON("https://seeclickfix.com/api/v2/issues?place_url=fruitvale-station"
  , function(data){

    var issues_list = [];

    $.each(data.issues, function(i, issue){

      if (issue.closed_at) {
        console.log(issue);
        markerLocation = new L.LatLng(parseFloat(issue.lat), parseFloat(issue.lng));
        imgs = ["http://i.giphy.com/VqFhKBifawzIc.gif","http://i.giphy.com/aKjnUBa0nSGn6.gif","http://i.giphy.com/nU704Y2jeFOHm.gif","http://i.giphy.com/a3IWyhkEC0p32.gif"]
        random = Math.floor((Math.random()* imgs.length ));
        var marker = new L.Marker(markerLocation).bindPopup("<h1>FIXED</h1>"+issue.summary + '<br/>' + issue.description + '<img src="'+ imgs[random] +'"/>');
        issues_list.push(marker);
      }

    })

    var open_cases_layer = new L.LayerGroup(issues_list);
    map.addLayer(open_cases_layer);

    $(".value").text(issues_list.length);

});


// create a marker

// function add_yesterdays_markers(open_or_closed){
//   if (open_or_closed == 'creation_date'){
//     var marker_color = marker_orange;
//   }
//   if (open_or_closed == 'closed_date'){
//     var marker_color = marker_blue;
//   }

//   var d = new Date();
//   var month = d.getMonth()+1;
//   var day = d.getDate() - 1;
//   var output = d.getFullYear() + '-' +
//       ((''+month).length<2 ? '0' : '') + month + '-' +
//       ((''+day).length<2 ? '0' : '') + day;
//   var yesterday = output+'T00:00:00'
//   var yesterdays_cases = $.getJSON("http://data.kcmo.org/resource/7at3-sxhp.json?$where="+open_or_closed+"='"+yesterday+"'"
//     , function(data){
//       // console.log(data);
//       // console.log(data.length);
//       if (open_or_closed == 'creation_date'){
//         $('#legend-newly-opened .value').html(data.length)
//       }
//       if (open_or_closed == 'closed_date'){
//         $('#legend-newly-closed .value').html(data.length)
//       }

//       for (i in data){
//         var latitude = data[i].address_with_geocode.latitude;
//         var longitude = data[i].address_with_geocode.longitude;
//         markerLocation = new L.LatLng(parseFloat(latitude), parseFloat(longitude));
//         var marker = new L.Marker(markerLocation, {icon: marker_color}).bindPopup(data[i].request_type+', '+data[i].creation_date);
//         open_cases_list.push(marker);
//       }
//       var open_cases_layer = new L.LayerGroup(open_cases_list);
//       map.addLayer(open_cases_layer);
//   });
// }

// // Yesterday
// add_yesterdays_markers('creation_date')
// add_yesterdays_markers('closed_date')
