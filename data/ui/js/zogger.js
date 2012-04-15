$(function(){

  var $fieldsCloud = $("#fields");
  $fieldsCloud.jQCloud(Zogger.fieldNameFacet());
  $('b.fields').text(Zogger.fieldNameFacet().length)
  Zogger.onReportUpdated(function(){
	$('#fields').html('');
	 $('b.fields').text(Zogger.fieldNameFacet().length)
    $fieldsCloud.jQCloud(Zogger.fieldNameFacet());
  });
		
  function countuper(div,high){
    var current = 0;
    var finish = $("."+div).text();
			
    var miliseconds = 3000;
    var rate = 10;

    var counter = setInterval(function(){
      if(current >= finish) clearInterval(counter);
      $("."+div).text("" + current);
      current = parseInt(current) + parseInt(rate);
    }, miliseconds / (finish / rate));
    console.log(finish)
    console.log(current)
  }

  countuper("sites");
  countuper("timespent");
  countuper("urls");
  countuper("countries");
  countuper("dangerzones");
  countuper("fields");
  countuper("people");
  countuper("passby");

  var timecapsule = $('.timecapsule');
  timecapsule.removeClass('dvadeset').removeClass('cetrdeset').removeClass('60').removeClass('80');
  timecapsule.addClass('dvadeset');

  var gdpData = {"af":16.63,"ba":11.58,"dz":158.97}
  var max = 0,
  min = Number.MAX_VALUE,
  cc,
  startColor = [200, 238, 255],
  endColor = [0, 100, 145],
  colors = {},
  hex;
  //find maximum and minimum values
  for (cc in gdpData) {
    if (parseFloat(gdpData[cc]) > max) {
      max = parseFloat(gdpData[cc]);
    }
    if (parseFloat(gdpData[cc]) < min) {
      min = parseFloat(gdpData[cc]);
    }
  }
  //set colors according to values of GDP
  for (cc in gdpData) {
    if (gdpData[cc] > 0) {
      colors[cc] = '#';
      for (var i = 0; i<3; i++) {
        hex = Math.round(startColor[i] + (endColor[i] - startColor[i])*(gdpData[cc] / (max - min))).toString(16);
        if (hex.length == 1) {
          hex = '0'+hex;
        }
        colors[cc] += (hex.length == 1 ? '0' : '') + hex;
      }
    }
  }
  $('#map').vectorMap({
    values: gdpData,
    backgroundColor: '#541304',
    scaleColors: ['#6f1805', '#f35733'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false
  });
		
});