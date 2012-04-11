var Zogger = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  onMenuItemCommand: function() {
    gBrowser.loadOneTab("chrome://zogger/content/zogger-report.xul");
  }
};

window.addEventListener("load", function(e) { Zogger.onLoad(e); }, false); 
