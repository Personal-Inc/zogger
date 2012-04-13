const ss = require("simple-storage");
const tabs = require("tabs");
const data = require("self").data;
var reportTab = null;

if (!ss.storage.requests) {
 ss.storage.requests = [];
 ss.storage.data = {};
}

function collectRequest(requestData){
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

function collectData(key, value){
    ss.storage.data[key] = value;
}

exports.collectRequest = collectRequest;
exports.reportToConsole = reportToConsole;
exports.reportToHTML = reportToHTML;
exports.collectData = collectData;

