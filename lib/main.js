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
    collector.reportToHTML();
  }
});

function getRequestHeaders(channel)
{
    var headers = [];

    if (channel instanceof Ci.nsIHttpChannel)
    {
        var http = channel.QueryInterface(Ci.nsIHttpChannel);
        http.visitRequestHeaders({
            visitHeader: function(name, value)
            {
                headers.push({name: name, value: value});
            }
        });
    }
    return headers;
}

function readFromStream(stream)
{
    try
    {
        var sis = Cc["@mozilla.org/binaryinputstream;1"].getService(Ci.nsIBinaryInputStream);
        sis.setInputStream(stream);

        var segments = [];
        for (var count = stream.available(); count; count = stream.available())
            segments.push(sis.readBytes(count));

        var text = segments.join("");
        return text;
    }
    catch(exc)
    {
        
    }
};

function getPostText(channel)
{
    try
    {
        var is = channel.QueryInterface(Ci.nsIUploadChannel).uploadStream;
        if (is)
        {
            var charset = 'UTF-8'; // TODO get charset
            var text = readFromStream(is);
            var ss = is.QueryInterface(Ci.nsISeekableStream);
            if ( ss )
                ss.seek(Ci.nsISeekableStream.NS_SEEK_SET, 0);
            return text;

        }
    }
    catch(exc)
    {
    }
}

observerService.add("http-on-modify-request",

    function(subject, topic, data){
        var channel = subject.QueryInterface(Ci.nsIHttpChannel), type = null;

        try {
            var header = channel.getRequestHeader("Content-Type");
            var regex = /^application\/x-www-form-urlencoded/i;
            if((header.match(regex)) && ((channel.requestMethod == 'POST') || (channel.requestMethod == 'PUT')))
                {
                    console.log("SSSSSSSSSSSSSSSS");
                    text = getPostText(channel);
                    console.log(text);
                  
                }
        }
        catch (e if e.result == Cr.NS_ERROR_NOT_AVAILABLE){

        }
    }
)

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

var xhr = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1'].
          createInstance(Ci.nsIXMLHttpRequest);
xhr.addEventListener('submit', function() {
    console.log("AJAX");
}, false);
