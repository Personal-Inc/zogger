var Zogger = (function(){

  var reportData;

  function updateReport(data){
    reportData = data;
  }

  function printToConsole(){
    console.log(reportData);
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
