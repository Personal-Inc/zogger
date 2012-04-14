
var word_list = [
  {text: "Lorem", weight: 13, url: "https://github.com/DukeLeNoir/jQCloud"},
  {text: "Ipsum", weight: 10.5, url: "http://jquery.com/", title: "My Title"},
  {text: "Dolor", weight: 9.4, url: "javascript:alert('JavaScript in URL is OK!');"},
  {text: "Sit", weight: 8},
  {text: "Amet", weight: 6.2},
  {text: "Consectetur", weight: 5},
  {text: "Adipiscing", weight: 5},
  {text: "Elit", weight: 5},
  {text: "Nam et", weight: 5},
  {text: "Leo", weight: 4},
  {text: "Sapien", weight: 4},
  {text: "Pellentesque", weight: 3},
  {text: "habitant", weight: 3},
  {text: "morbi", weight: 3},
  {text: "tristisque", weight: 3},
  {text: "senectus", weight: 3},
  {text: "et netus", weight: 3},
  {text: "et malesuada", weight: 3},
  {text: "fames", weight: 2},
  {text: "ac turpis", weight: 2},
  {text: "egestas", weight: 2},
  {text: "Aenean", weight: 2},
  {text: "vestibulum", weight: 2},
  {text: "elit", weight: 2},
  {text: "sit amet", weight: 2},
  {text: "metus", weight: 2},
  {text: "adipiscing", weight: 2},
  {text: "ut ultrices", weight: 2},
  {text: "justo", weight: 1},
  {text: "dictum", weight: 1},
  {text: "Ut et leo", weight: 1},
  {text: "metus", weight: 1},
  {text: "at molestie", weight: 1},
  {text: "purus", weight: 1},
  {text: "Curabitur", weight: 1},
  {text: "diam", weight: 1},
  {text: "dui", weight: 1},
  {text: "ullamcorper", weight: 1},
  {text: "id vuluptate ut", weight: 1},
  {text: "mattis", weight: 1},
  {text: "et nulla", weight: 1},
  {text: "Sed", weight: 1}
];
	    
	
$(function(){
  $("#fields").jQCloud(word_list);
		
		
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
	
  $('.danger').mouseover(function(){
    $(this)				
  });
  var timecapsule = $('.timecapsule');
  timecapsule.removeClass('dvadeset').removeClass('cetrdeset').removeClass('60').removeClass('80');
  timecapsule.addClass('dvadeset')
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