const ss = require("simple-storage");
const tabs = require("tabs");
const data = require("self").data;
var reportTab = null;

if (!ss.storage.requests) {
 ss.storage.requests = [];
 ss.storage.data = {};
}

function collectRequest(requestData){
  requestData.timestamp = new Date().getTime();
  ss.storage.requests.push(requestData);  
}

function reportToConsole(){
  for (var r in ss.storage.requests) {
    console.log(JSON.stringify(ss.storage.requests[r]));
  }
}

function reportToHTML(){
  var found = false;
  for each (var tab in tabs){
    if (tab.title == 'Zogger Report') {
      found = true;
      tab.activate();
      updateHTMLReport();
    }
  }
  if (!found) {
    tabs.open({
      url : data.url("ui/report.html")
    });
  }
}

var reportWorker;
function updateHTMLReport(){
  reportWorker.port.emit("updateReport", ss.storage.requests);
}

tabs.on('ready', function(tab) {
  if (!(/zogger.*report.html$/).test(tab.url)) {
    var worker = tab.attach({
      contentScriptFile: [ data.url("ui/jquery.min.js"), data.url("submits-handler.js", data.url("sha.js")) ]
    });
    worker.port.on("collectRequest", function(requestData){
      collectRequest(requestData); 
    });
  }
});

var pageMod = require("page-mod");
pageMod.PageMod({
  include: ["resource://*"],// TODO: need more specific matching here
  contentScriptFile: data.url("report.js"),
  contentScriptWhen: 'end',
  onAttach: function onAttach(worker) {
    reportWorker = worker;
    updateHTMLReport();
  }
});

exports.collectRequest = collectRequest;
exports.reportToConsole = reportToConsole;
exports.reportToHTML = reportToHTML;
