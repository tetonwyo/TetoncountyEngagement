/**
 * Created with RubyMine.
 * By: superrunt
 * Date: 6/16/15
 * Time: 9:07 PM
 */

var client = algoliasearch('P71J7RF23K', '20ceae787550b54ab727a6129342f4c1');

var initAndDisplayAlgoliaSearch = function ( targetElement ) {

    var _target = $(targetElement)
    // add all the DOM elements we need
    // this is where the sorting button should be added
    _target.append('<div id="searchForm"><input id="searchInput" type="text" name="fname" placeholder="Enter Search Here"></div><div id="searchResultsContainer"></div>')

    // get handlebar template and 'fill out'
    $.get("/templates/algoliasearch_results.hbs", function ( source ) {

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

        // Pseudo code for binding a sirt function to a sort button
        jQuery("#mySortingButton").on('click', function() {

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

        //
        // Function a_search
        // @query : string query for searching
        //
        function a_search(query, indexAddon){

            // TODO: add indexAddon here
            if ( indexAddon ) {
                // create string for indexName attributes below
            }

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

            var template = Handlebars.compile(source);

            var context = results;
            var html    = template(context);
            jQuery("#searchResultsContainer").html(html);
        }

    })
}



