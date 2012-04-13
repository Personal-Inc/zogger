jQuery(function (){

    $('form').submit(function(){
        var submitData = { type : "formSubmit", data : {}};
        $(this).find("input").each(function(index, element)
            {
                var fieldName = element.name;
                var fieldValue = $(element).val();
                if(element.type == "password")
                    return;

                submitData.data[fieldName] = fieldValue; 
            }
        )
        console.log("--------------------");
        console.log(JSON.stringify(submitData));
        console.log("--------------------");
        self.port.emit('collectRequest', submitData);
    })
})
