function calcHash(data) {
  var shaObj = new jsSHA(data, 'ASCII');
  return shaObj.getHash('SHA-256','HEX');
}

var submitData = { type : "formSubmit", data : {}};

function parseParams(params){
    paramsArry = params.split("&");
    $.each(paramsArry, function(index, element){
        data = element.split("=");
        name = data[0];
        value = data[1];
        if(value)
        {
            var fieldValue = value.length == 0 ? value : calcHash(value);
            submitData.data[name] = fieldValue;
        }
    })

    return;
}

self.port.on("hash", function(text){
    parseParams(text);
    self.port.emit("hashedParams", submitData);
})