var Zogger = (function(){

  var reportData;

  function updateReport(data){
    reportData = data;
  }

  function printToConsole(){
    console.log(reportData);
  }

  function fieldNameFacet(){
    return [
	 {text: "first_name", weight: 15},
		 {text: "last_name", weight: 115},
		 {text: "name", weight: 415},
		 {text: "email", weight: 5},
		 {text: "password", weight: 215},
    ];
  }

  return {
    fieldNameFacet : fieldNameFacet,
    printToConsole : printToConsole,
    updateReport : updateReport
  };

})();

(function($){

  $(function(){
    $("#main").click(function(){
      console.log("report");
    });
  });

})(jQuery);
