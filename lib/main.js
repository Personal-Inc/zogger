const widgets = require("widget");
const tabs = require("tabs");
const observerService = require('observer-service');
var {Cc, Ci, Cr} = require('chrome');
const eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].
                getService(Ci.nsIEffectiveTLDService);
const notifications = require("notifications");
const data = require("self").data;
const self = require("self");
const collector = require("./collector");

var widget = widgets.Widget({
  id: "zogger-link",
  label: "Zogger report",
  contentURL: self.data.url("ui/zogger.png"),
  onClick: function() {
    //collector.reportToConsole();
    collector.reportToHTML();
  }
});


observerService.add("http-on-examine-response", function(subject, topic, data) {
  var channel = subject.QueryInterface(Ci.nsIHttpChannel), type = null;
  if (channel.referrer) {
    var referrerDomain = getDomain(channel.referrer.host);
    var domain = getDomain(channel.URI.host);
    try {
      type = subject.getResponseHeader("Content-Type");
    } catch (e if e.result == Cr.NS_ERROR_NOT_AVAILABLE) {}
    collector.collectRequest({
      type : "httpResponse",
      domain : domain,
      referrerDomain : referrerDomain,
      contentType : type
    });
  }
});

function getDomain(host) {
  try {
    return eTLDService.getBaseDomainFromHost(host);
  } catch (e if e.result == Cr.NS_ERROR_INSUFFICIENT_DOMAIN_LEVELS) {
    return host;
  } catch (e if e.result == Cr.NS_ERROR_HOST_IS_IP_ADDRESS) {
    return host;
  }
}
