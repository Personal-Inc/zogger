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
    }
  }
  if (!found) {
    tabs.open(data.url("ui/report.html"));
  }
}

tabs.on('ready', function(tab) {
  worker = tab.attach({contentScriptFile: [data.url("ui/jquery.min.js"), data.url("submits-handler.js")]});
  worker.port.on("collectRequest", function(requestData){
    collectRequest(requestData); 
  });
});

exports.collectRequest = collectRequest;
exports.reportToConsole = reportToConsole;
exports.reportToHTML = reportToHTML;
