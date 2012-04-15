const ss = require("simple-storage");
const tabs = require("tabs");
const data = require("self").data;
var Request = require("request").Request;

var reportTab = null;

if (!ss.storage.report) {
 ss.storage.report = {};
 ss.storage.report.raw = [];
 ss.storage.report.facets = {};
 ss.storage.report.facets["fieldName"] = {};
 ss.storage.report.facets["domain"] = {};
 ss.storage.report.facets["country"] = {};
 ss.storage.domains = {};
}

function incrementFacet(name, value){
  if (!ss.storage.report.facets[name][value]) {
    ss.storage.report.facets[name][value] = 0;
  }
  ss.storage.report.facets[name][value] += 1;
  // console.log('Facets: ' + value + ': ' + ss.storage.report.facets[name][value]);
}

function getGeoData(domain){
  try {
    var apiData = Request({
      url: 'http://api.ipinfodb.com/v3/ip-country/?ip=' + domain + '&key=2ad795ab28af53a60c180ac1c6ee2d6d64c6ac1211ced18a4092ca0f42300208&format=json',
      onComplete: function (response) {
        if (response.json.statusCode == 'OK'){
          ss.storage.domains[domain] = response.json;
          incrementFacet("country", response.json.countryCode);
          // console.log("Geocoding API: " + domain + ' ' + JSON.stringify(response.json));
        }
        else{
          console.log("Geocoding API Error: " + domain + ' ' + JSON.stringify(response.json));
        }
      }
    }).get();
  }
  catch (ex){
    console.log(ex);
  }
}

function logDomain(domain){
  if (!ss.storage.domains[domain]){
    ss.storage.domains[domain] = {"statusCode":"API Called"};
    getGeoData(domain);
  }
  incrementFacet("domain", domain);
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
  logDomain(requestData.domain);
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
