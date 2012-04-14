const ss = require("simple-storage");
const tabs = require("tabs");
const data = require("self").data;
var reportTab = null;

if (!ss.storage.report) {
 ss.storage.report = {};
 ss.storage.report.raw = [];
 ss.storage.report.facets = {};
 ss.storage.report.facets["fieldName"] = {};
}

function incrementFacet(name, value){
  if (!ss.storage.report.facets[name][value]) {
    ss.storage.report.facets[name][value] = 0;
  }
  ss.storage.report.facets[name][value] += 1;
}

function collectRequest(requestData){
  if (requestData.type == "formSubmit"){
    var data = requestData.data;
    for (var k in data){
      if (data[k] && data[k].length > 0) {
        incrementFacet("fieldName", k);
      }
    }
  }
  requestData.timestamp = new Date().getTime();
  ss.storage.report.raw.push(requestData);
}

function reportToConsole(){
  for (var r in ss.storage.report.raw) {
    console.log(JSON.stringify(ss.storage.report.raw[r]));
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
  reportWorker.port.emit("updateReport", ss.storage.report);
}

tabs.on('ready', function(tab) {
  if (!(/zogger.*report.html$/).test(tab.url)) {
    var worker = tab.attach({
      contentScriptFile: [ data.url("ui/jquery.min.js"), data.url("submits-handler.js"), data.url("sha.js") ]
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
