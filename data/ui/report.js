var Zogger = (function(){

  var reportData;

  function updateReport(data){
    reportData = data;
  }

  function printToConsole(){
    console.log(reportData);
  }

  function fieldNameFacet(){
    return getFacetObjects("fieldName", "text", "weight");
  }

  function getFacet(name){
    return reportData.facets[name];
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
    fieldNameFacet : fieldNameFacet,
    printToConsole : printToConsole,
    updateReport : updateReport
  };

})();
