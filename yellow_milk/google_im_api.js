/**
 * Created by Tim on 2-5-2017.
 */
$(function() {
    var params = {
        // Request parameters
        "q": "vermeer milkmaid",
    };

    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","multipart/form-data");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","0a661bc4af424116b1d8a1c4a0438935");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
        .done(function(data) {
            // console.log(data);
            var thumbs = []
            var items = data.value.slice(0,2);
            for(var i=0; i < items.length; i++) {
                // console.log(items[i]);
                var currentItems = items[i];
                thumbers = currentItems.thumbnailUrl
                thumbs.push(thumbers)
            }
            console.log(thumbs)
        })
        .fail(function() {
            alert("error");
        });
});