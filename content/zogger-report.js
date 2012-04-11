var ZoggerReport = {
  onLoad: function() {
    this.initialized = true;
    console.log('loading zogger report');
  }

};

window.addEventListener("load", function(e) { ZoggerReport.onLoad(e); }, false); 
