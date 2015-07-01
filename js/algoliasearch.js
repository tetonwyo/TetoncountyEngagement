/**
 * Created with RubyMine.
 * By: superrunt
 * Date: 6/16/15
 * Time: 9:07 PM
 */


Handlebars.registerHelper('each_upto', function(ary, start, max, options) {

    if(!ary || ary.length == 0)
        return options.inverse(this);

    if(!start || typeof start == "undefined")
        start = 0;

    var result = [ ];

    for(start; start < max && start < ary.length; ++start)
        result.push(options.fn(ary[start]));

    return result.join('');
});



var moreResults = "web";
var lastResults;
var client = algoliasearch('P71J7RF23K', '20ceae787550b54ab727a6129342f4c1');
var $templateContainers = jQuery("#docResultsContainer, #webResultsContainer");


//
// Function a_search
// @query : string query for searching
//
function a_search(query, indexAddon, limit){
    if ( !indexAddon ) indexAddon = "";
    if ( !limit ) limit = 10;
    var queries = [{
        indexName: 'dev_tetonwyo' + indexAddon,
        query: query,
        params: {hitsPerPage: limit, attributesToRetrieve: "Url,Description,SubTitle,Description,PublishDate,DepartmentName,Type"}
    }, {
        indexName: 'dev_tetonwyo_documents',
        query: query,
        params: {hitsPerPage: limit, distinct: true, attributesToRetrieve: "parentTitle,url,title,meetingTitle"}
    }];

    client.search(queries, searchMultiCallback);

}

function searchMultiCallback(err, content) {
    if (err) {
        console.error(err);
        //return;
    }

    if ( content && content.results ) {
        var results = {};
        results.web = content.results[0].hits;
        results.docs = content.results[1].hits;

        console.log(results);

        var webResults      = $("#webResultsTemplate").html();
        var webResultsMore  = $("#webResultsTemplateMore").html();
        var docResults      = $("#docResultsTemplate").html();
        var docResultsMore  = $("#docResultsTemplateMore").html();

        var webResultsTemplate = Handlebars.compile(webResults);
        var docResultsTemplate = Handlebars.compile(docResults);

        var webResultsHtml    = webResultsTemplate(results);
        var docResultsHtml    = docResultsTemplate(results);

        // Apply our web results template
        jQuery("#webResultsContainer").html(webResultsHtml);

        // Apply our doc results template
        jQuery("#docResultsContainer").html(docResultsHtml);

        displayMoreBlock (moreResults, results);
    }

}

function displayMoreBlock ( moreOf, results ) {
    // TODO: fix this!
    if ( results ) {
        lastResults = results
    } else if (lastResults) {
        results = lastResults
    } else {
        console.log("nothing to display")
        return
    }

    var _currentlyVisible = $("div.moreResultsContainer div.results");

    if (moreOf == "docs" && !_currentlyVisible.hasClass("doc"))
    {
        console.log("more doc");
        var docResultsMore = $("#docResultsTemplateMore").html();
        var docResultsTemplateMore = Handlebars.compile(docResultsMore);
        var docResultsMoreHtml    = docResultsTemplateMore(results);
        jQuery("#moreResultsContainer").html(docResultsMoreHtml);
    }
    else if (moreOf == "web" && !_currentlyVisible.hasClass("web"))
    {
        console.log("more web");
        var webResultsMore = $("#webResultsTemplateMore").html();
        var webResultsTemplateMore = Handlebars.compile(webResultsMore);
        var webResultsMoreHtml    = webResultsTemplateMore(results);
        jQuery("#moreResultsContainer").html(webResultsMoreHtml);
    }
}



var initAndDisplayAlgoliaSearch = function ( targetElement ) {

    var _target = $(targetElement)
    // add all the DOM elements we need
    // this is where the sorting button should be added
    _target.append('<div id="searchForm"><input id="searchInput" type="text" name="fname" placeholder="Enter Search Here"></div><div class="row">'
                +'<div id="webResultsContainer"></div><button class="more" data-moreof="web">More Web Results</button></div><div class="row"><div id="docResultsContainer"></div><button class="more" data-moreof="docs">More Doc Results</button></div><div class="row"><div id="moreResultsContainer"></div>'
                                +'</div></div>');


    // get handlebar template and 'fill out'
    $.get("/templates/algoliasearch_results.hbs", function ( source ) {
        $("body").append(source);

        // Bind the searchBox search event to keyup.
        jQuery("#searchInput").on('keyup', function(){
            var queryString = jQuery("#searchInput").val();

            if(queryString === ""){
                jQuery("#searchResultsContainer").html("");
            }
            else{
                a_search(queryString);
            }
        });

        // sort button
        jQuery("button.sort").on('click', function() {
            // if no search query present, just return
            if ( $("#searchInput").val() === "" ) return

            var _this = $(this),
                _indexAddon = _this.attr("data-addon");

            var queryString = jQuery("#searchInput").val();
            if(queryString === ""){
                jQuery("#searchResultsContainer").html("");
            }
            else{
                a_search(queryString, _indexAddon);
            }
        });

        // more buttons
        jQuery("button.more").on('click', function() {
            var _this = $(this),
                _moreOf = _this.attr("data-moreof");

            displayMoreBlock(_moreOf)
        });

        //
        // Bind the searchBox search event to keyup.
        //
        jQuery("#searchInput").on('keyup', function(){
            var queryString = jQuery("#searchInput").val();

            if(queryString === ""){
                $templateContainers.html("");
            }
            else{
                a_search(queryString);
            }
        });

    });
}



