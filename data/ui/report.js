var Zogger = (function(){

  var reportData, observers = { "reportUpdated" : []};

  function onReportUpdated(callback){
    addObserver("reportUpdated", callback);
  }

  function addObserver(eventType, observer){
    observers[eventType].push(observer)
  }

  function notifyObservers() {
    var args = Array.prototype.slice.call(arguments);
    var event = args.shift();
    $.each(observers[event], function(idx, callback){
      callback.apply(this, args);
    });
  }

  function updateReport(data){
    reportData = data;
    notifyObservers("reportUpdated", data);
  }

  function printToConsole(){
    console.log(reportData);
  }
  
  function getFacet(name){
    return reportData ? reportData.facets[name] : {};
  }

  function getFacetObjects(facetName, valueProperty, countProperty){
    var objects = [];
    var facet = getFacet(facetName);
    for (var value in facet){
      var object = {};
      object[valueProperty] = value;
      object[countProperty] = facet[value];
      objects.push(object);
    }
    return objects;
  }

  return {
    printToConsole : printToConsole,
    updateReport : updateReport,
    onReportUpdated : onReportUpdated,
    getFacetObjects : getFacetObjects,
	getFacet : getFacet
  };

})();
