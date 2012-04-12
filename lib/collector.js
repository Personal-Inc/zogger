const ss = require("simple-storage");

if (!ss.storage.requests) {
 ss.storage.requests = [];
}

function collectRequest(requestData){
  ss.storage.requests.push(requestData);  
}

function reportToConsole(){
  for (var r in ss.storage.requests) {
    console.log(JSON.stringify(ss.storage.requests[r]));
  }
}

exports.collectRequest = collectRequest;
exports.reportToConsole = reportToConsole;
