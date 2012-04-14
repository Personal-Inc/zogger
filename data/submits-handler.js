function calcHash(data) {
  var shaObj = new jsSHA(data, 'ASCII');
  return shaObj.getHash('SHA-256','HEX');
}

jQuery(function (){
  $('form').submit(function(){
    var submitData = { type : "formSubmit", data : {}};
    $(this).find("input").each(function(index, element) {
      var fieldName = element.name;
      var value = $(element).val();
      var fieldValue = value.length == 0 ? value : calcHash($(element).val());
      submitData.data[fieldName] = fieldValue;
    });
    self.port.emit('collectRequest', submitData);
  })
});
