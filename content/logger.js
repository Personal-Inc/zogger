function log2Console(aMessage) {
  var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
                                 .getService(Components.interfaces.nsIConsoleService);
  consoleService.logStringMessage("ZOGGER: " + aMessage);
}

function logObject2Console(aObject) {
  log2Console(JSON.stringify(aObject));
}


