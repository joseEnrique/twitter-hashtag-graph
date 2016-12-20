/*var nodes = [];
var edges = [];

$( document ).ready(function() {

var request = $.ajax({
  url: '/api/v1/small/zones',
  type:"GET",
  contentType: "application/json",
});

request.done(function(data) {

//      console.log(data);
  $.each(data, function(index1, zone) {
//    console.log(zone.time_zone);

    nodes.push({id: index1,  label: zone.time_zone, value: 50, group: index1, x: (Math.random() * (999.999 - (-999.999)) + (-999.999)), y: (Math.random() * (999.999 - (-999.999)) + (-999.999))});

    var request2 = $.ajax({
      url: '/api/v1/small/zones/'+zone.time_zone,
//          url: '/api/v1/small/zones/Tehran',
      type:"GET",
      contentType: "application/json",
    });

    request2.done(function(zone) {
  //        console.log(zone[0].time_zone);
//          console.log(zone[0].nodes);


      $.each(zone[0].nodes, function(index, tweet) {

        nodes.push({id: index + 1, value: 30, group: index1, x: (Math.random() * (999.999 - (-999.999)) + (-999.999)), y: (Math.random() * (999.999 - (-999.999)) + (-999.999))});
        edges.push({from: index1,  to: index + 1});

      });
//      console.log(edges);
    });


    request2.always(function(jqXHR, status, statusText) {
      console.log(request2.status);
    });

  });



});



request.always(function(jqXHR, status, statusText) {
  console.log(request.status);
});


});

console.log(nodes);
*/