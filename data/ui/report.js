var Zogger = (function(){

  var reportData;

  function updateReport(data){
    reportData = data;
  }

  function printToConsole(){
    console.log(reportData);
  }

  function fieldNameFacet(){
    return {
      'first_name' : 3,
      'last_name' : 3, 
      'name' : 22,
      'email' : 66,
      'password' : 20
    };
  }

  return {
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
