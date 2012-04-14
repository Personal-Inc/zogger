self.port.on('updateReport', function(data){
  unsafeWindow.Zogger.updateReport(data);
});
