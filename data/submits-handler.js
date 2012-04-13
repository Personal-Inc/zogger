jQuery(function (){

    $('form').submit(function(){
        var submitData = { data : {}};
        $(this).find("input").each(function(index, element)
            {
                var fieldName = element.name;
                var fieldValue = $(element).val();

                if((/pass|password|pwd/).test(fieldName))
                    return;

                submitData.data[fieldName] = fieldValue; 
            }
        )
        console.log("--------------------");
        console.log(submitData);
        console.log("--------------------");
        self.port.emit('collectRequest', submitData);
    })
})
