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
    var client = algoliasearch('P71J7RF23K', '20ceae787550b54ab727a6129342f4c1');
    var $templateContainers = jQuery("#docResultsContainer, #webResultsContainer");

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


var initAndDisplayAlgoliaSearch = function ( targetElement ) {

    var _target = $(targetElement)
    // add all the DOM elements we need
    _target.append('<div id="searchForm"><input id="searchInput" type="text" name="fname" placeholder="Enter Search Here"></div><div class="row">'
                +'<div id="webResultsContainer"></div></div><div class="row"><div id="docResultsContainer"></div></div><div class="row"><div id="moreResultsContainer"></div>'
                                +'</div></div>')

    // get handlebar template and 'fill out'
    $.get("/templates/algoliasearch_results.hbs", function ( source ) {

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
                params: {hitsPerPage: 3, attributesToRetrieve: "Url,Description,SubTitle,Description,PublishDate,DepartmentName,Type"}
            }, {
                indexName: 'dev_tetonwyo_documents',
                query: query,
                params: {hitsPerPage: 5, distinct: true, attributesToRetrieve: "parentTitle,url,title,meetingTitle"}
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

        var webResults   = $("#webResultsTemplate").html();
        var docResults   = $("#docResultsTemplate").html();

        var webResultsTemplate = Handlebars.compile(webResults);
        var docResultsTemplate = Handlebars.compile(docResults);

        var webResultsHtml    = webResultsTemplate(results);
        var docResultsHtml    = docResultsTemplate(results);
        
        // Apply our web results template
        jQuery("#webResultsContainer").html(webResultsHtml);

        // Apply our doc results template
        jQuery("#docResultsContainer").html(docResultsHtml);

        // TODO: Apply the rest of either docs or web based on variable.
        if(moreResults == "docs")
        {
            console.log("doc");
            var docResultsMore = $("#docResultsTemplateMore").html();
            var docResultsTemplateMore = Handlebars.compile(docResultsMore);
            var docResultsMoreHtml    = docResultsTemplateMore(results);
            jQuery("#moreResultsContainer").html(docResultsMoreHtml);
        }
        else if(moreResults == "web")
        {
            console.log("web");
            var webResultsMore = $("#webResultsTemplateMore").html();
            var webResultsTemplateMore = Handlebars.compile(webResultsMore);
            var webResultsMoreHtml    = webResultsTemplateMore(results);
            jQuery("#moreResultsContainer").html(webResultsMoreHtml);
        }

    }

    });
}



