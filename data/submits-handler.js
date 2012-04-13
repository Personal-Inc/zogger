jQuery(function (){

    $('form').submit(function(){
        $(this).find("input").each(function(index, element)
            {
                console.log("--------------------");

                var fieldName = element.name;
                var fieldValue = $(element).val();

                if((/pass|password|pwd/).test(fieldName))
                    return;

                console.log(fieldName);
                console.log(fieldValue);
                //collector.collectData(fieldName, fieldValue);
                console.log("--------------------");
            }
        )
    })
})