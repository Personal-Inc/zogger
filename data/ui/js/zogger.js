function fieldNameCounts(){
  return Zogger.getFacetObjects("fieldName", "text", "weight");
}

function contentTypeCounts(){
  return Zogger.getFacetObjects("contentType", "text", "weight");
}

function countryCounts(){
  return Zogger.getFacet("country");
}

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

 }

function closePreloader(){
  $('#preloader').hide();
}

function addFavicons(){
	var domains = Zogger.getFacet("domain");
	$.each(domains, function(index, value) {
	  $('.favicons').prepend("<img src='http://www."+index+"/favicon.ico' width='16' height='16' />");
	});
	
	$('img').error(function() {
	  $(this).remove();
	});
}
$(function(){
	
  setTimeout('fireUpMap();', 2000);
  setTimeout('addFavicons()', 200);
  setTimeout('closePreloader();', 3000);
  

  var $contentCloud = $("#dangerzone");
  $contentCloud.jQCloud(contentTypeCounts());
  $('b.dangerzone').text(contentTypeCounts().length);
  Zogger.onReportUpdated(function(){
    $contentCloud.html('');
    $('b.dangerzone').text(contentTypeCounts().length);
    $contentCloud.jQCloud(contentTypeCounts());
  });

  


  var $fieldsCloud = $("#fields");
  $fieldsCloud.jQCloud(fieldNameCounts());
  $('b.fields').text(fieldNameCounts().length);
  Zogger.onReportUpdated(function(){
    $fieldsCloud.html('');
    $('b.fields').text(fieldNameCounts().length);
    $fieldsCloud.jQCloud(fieldNameCounts());
  });
		
  Zogger.onReportUpdated(function(){
	$('#map').html('');
	fireUpMap();
	$('#allfavs').html('<div class="favicons"></div>');
	addFavicons();
});

  countuper("timespent");
  countuper("urls");
  countuper("dangerzones");
  countuper("fields");
  countuper("people");
  countuper("passby");

  var timecapsule = $('.timecapsule');
  timecapsule.removeClass('dvadeset').removeClass('cetrdeset').removeClass('60').removeClass('80');
  timecapsule.addClass('dvadeset');

 

		
});



function fireUpMap(){
  $('.removemap').hide();

  $('b.sites').text(Zogger.getFacetObjects("domain", "text", "weight").length);
  $('b.countries').text(Zogger.getFacetObjects("country", "text", "weight").length);
  countuper("countries");
	var gdpData = countryCounts();
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
	
}
