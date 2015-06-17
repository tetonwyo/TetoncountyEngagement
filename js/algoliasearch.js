/**
 * Created with RubyMine.
 * By: superrunt
 * Date: 6/16/15
 * Time: 9:07 PM
 */



var client = algoliasearch('P71J7RF23K', '20ceae787550b54ab727a6129342f4c1');

//
// Bind the searchBox search event to keyup.
//
jQuery("#searchInput").on('keyup', function(){
    var queryString = jQuery("#searchInput").val();

    if(queryString === ""){
        jQuery("#searchResultsContainer").html("");
    }
    else{
        a_search(queryString);
    }
});



//
// Function a_search
// @query : string query for searching
//
function a_search(query){

    var queries = [{
        indexName: 'dev_tetonwyo',
        query: query,
        params: {hitsPerPage: 3}
    }, {
        indexName: 'dev_tetonwyo_documents',
        query: query,
        params: {hitsPerPage: 5, distinct: true}
    }];

    client.search(queries, searchMultiCallback);

}


function searchMultiCallback(err, content) {
    if (err) {
        console.error(err);
        return;
    }
    var results = {};
    results.web = content.results[0].hits;
    results.docs = content.results[1].hits;

    console.log(results);

    var source   = $("#results-template").html();
    var template = Handlebars.compile(source);

    var context = results;
    var html    = template(context);
    jQuery("#searchResultsContainer").html(html);
}