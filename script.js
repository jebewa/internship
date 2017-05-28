/**
 * Created by bert on 07/04/2017.
 */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        /* Toggle between adding and removing the "active" class,
         to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

function searchCore() {
    jQuery("#core").empty(); // emptying the div before appending new references
    var searchRef = (jQuery("#requestRef").val().split(" ")); // if there are more than one searchwords: split them and
    //  inside an array --> do this with jquery instead of js
    searchRef = searchRef.join("%20");  // splitting and joining the input because when there are multiple search-terms they have to be joined
                                        // into one string with %20 to create an AND search
    var whatever = jQuery.get({
        url: "https://core.ac.uk:443/api-v2/articles/search/"+ searchRef +"?page=1&pageSize=3&metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=mD28Egkx5ZV7SdjXsMC3FrhLYRewoayG"
    })
        .done(function (response) {
            var dataArray = response.data;
            console.log(dataArray);
            if (dataArray == null) {                // do not cause error and empty div when there is no result for a query
                jQuery("#core").append("No results matching this search!");
            }
            else {
                for (var i = 0; i < 6; i++) {                  // --> only the first three references
                    var currentItems = dataArray[i];
                    var authors = currentItems.authors;
                    var title = currentItems.title;
                    var year = currentItems.datePublished;
                    var fullText = '<a href="' + currentItems.fulltextUrls[0] + '" target="_blank">' + currentItems.fulltextUrls[0] + "</a>";       // target _blank for opening links in new tab
                    var result = "<li>" + authors + ", " + title + ", " + year + ", " + fullText + "</li>";
                    jQuery("#core").append(result); // could maybe also append div as a whole together with the content
                }
            }
        });
    return false
}