var Zogger = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  onMenuItemCommand: function() {
    gBrowser.loadOneTab("chrome://zogger/content/zogger-report.xul");
  }
};

var httpRequestObserver =  
{  
  observe: function(subject, topic, data)  
  {  
    if (topic == "http-on-modify-request") {  
      var httpChannel = subject.QueryInterface(Components.interfaces.nsIHttpChannel);  
      logObject2Console(httpChannel.originalURI); 
    }  
  },  
  
  get observerService() {  
    return Components.classes["@mozilla.org/observer-service;1"]  
                     .getService(Components.interfaces.nsIObserverService);  
  },  
  
  register: function()  
  {  
    this.observerService.addObserver(this, "http-on-modify-request", false);  
  },  
  
  unregister: function()  
  {  
    this.observerService.removeObserver(this, "http-on-modify-request");  
  }  
};

window.addEventListener("load", function(e) { Zogger.onLoad(e); }, false); 
httpRequestObserver.register();