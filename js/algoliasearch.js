// ALL HANDLEBAR TEMPLATES HAVE BEEN MOVED TO /templates

// HANDLEBARS HELPERS
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
Handlebars.registerHelper("formatDate", function(dateStr){
    if ( !dateStr ) {
        return "";
    }
    var date = new Date(dateStr)
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
});
Handlebars.registerHelper('chop', function(str, chars) {
    // TODO: change to chop at full word
    if (str.length > chars)
        return str.substring(0,chars) + '...';
    return str;
});


// ACTUAL SEARCH STUFF

var moreResults = "web";
var lastResults;
var client = algoliasearch('P71J7RF23K', '20ceae787550b54ab727a6129342f4c1');
var $templateContainers = jQuery("#docResultsContainer, #webResultsContainer");

function sortByCountDesc(a, b) {
    return b.count - a.count;
}

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
        params: {hitsPerPage: limit, attributesToRetrieve: "Url,Description,Title,SubTitle,Description,PublishDate,DepartmentName,Type,Tags"}
    }, {
        indexName: 'dev_tetonwyo_documents',
        query: query,
        params: {hitsPerPage: limit, distinct: true, attributesToRetrieve: "parentTitle,url,title,meetingTitle,tags"}
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
        console.log(results.web);

        // getFacetsInResults(results.web)

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

function getFacetsInResults ( content ) {

    var facet_config = [
        { name: 'Type', title: 'Type', disjunctive: false, sortFunction: sortByCountDesc },
        { name: 'DepartentName', title: 'DepartmentName', disjunctive: false, sortFunction: sortByCountDesc },
        { name: 'Tags', title: 'Tags', disjunctive: false, sortFunction: sortByCountDesc }
        ];

    // Process facets
    var facets = [];
    for (var facetIndex = 0; facetIndex < facet_config.length; ++facetIndex) {
        var facetParams = facet_config[facetIndex];
        var facetResult = content[facetParams.name];
        if (facetResult) {
            var facetContent = {};
            facetContent.facet = facetParams.name;
            facetContent.title = facetParams.title;
            facetContent.type = facetParams.type;

            if (facetParams.type === 'slider') {
                // if the facet is a slider
                facetContent.min = facetResult.stats.min;
                facetContent.max = facetResult.stats.max;
                var valueMin = state.getNumericRefinement(facetParams.name, '>=') || facetResult.stats.min;
                var valueMax = state.getNumericRefinement(facetParams.name, '<=') || facetResult.stats.max;
                valueMin = Math.min(facetContent.max, Math.max(facetContent.min, valueMin));
                valueMax = Math.min(facetContent.max, Math.max(facetContent.min, valueMax));
                facetContent.values = [valueMin, valueMax];
            } else {
                // format and sort the facet values
                var values = [];
                for (var v in facetResult.data) {
                    values.push({
                        label: v,
                        value: v,
                        id: getUniqueId(),
                        count: facetResult.data[v],
                        refined: helper.isRefined(facetParams.name, v)
                    });
                }
                var sortFunction = facetParams.sortFunction || sortByCountDesc;
                if (facetParams.topListIfRefined) sortFunction = sortByRefined(sortFunction);
                values.sort(sortFunction);

                facetContent.values = values.slice(0, 10);
                facetContent.has_other_values = values.length > 10;
                facetContent.other_values = values.slice(10);
                facetContent.disjunctive = facetParams.disjunctive;

            }
            facets.push(facetContent);
        }
    }
    console.log(facets)
}

var initAndDisplayAlgoliaSearch = function ( targetElement ) {

    var _target = $(targetElement)
    // add all the DOM elements we need
    // this is where the sorting button should be added
    _target.append('<div class="algoliasearch">'
                + '<button class="sort desc" data-addon="_timestamp_desc">Sort By Date Desc</button><button class="sort asc" data-addon="_timestamp_asc">Sort By Date Asc</button>'
                + '<div id="searchForm"><input id="searchInput" type="text" name="fname" placeholder="Enter Search Here"></div><div class="row">'
                + '<div id="webResultsContainer"></div><button class="more" data-moreof="web">More Web Results</button></div><div class="row">'
                + '<div id="docResultsContainer"></div><button class="more" data-moreof="docs">More Doc Results</button></div><div class="row"><div id="moreResultsContainer"></div>'
                +'</div></div></div>');


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
