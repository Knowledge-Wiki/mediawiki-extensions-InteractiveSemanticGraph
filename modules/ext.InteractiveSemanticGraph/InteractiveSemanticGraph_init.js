/*@nomin*/
/* 
DEV: MediaWiki:InteractiveSemanticGraph.js
REL: modules/ext.InteractiveSemanticGraph/InteractiveSemanticGraph.js
hint: ResourceLoader minifier does not support ES6 yet, therefore skip minification  with "nomin" (see https://phabricator.wikimedia.org/T255556)
*/

$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.parser'),
        mw.loader.using('ext.mwjson.editor'),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    ).done(function () {    
		var semanticGraphs = JSON.parse( mw.config.get( 'semanticgraphs' ) );
	
        $(".InteractiveSemanticGraph").each(function (index) {
        	var graphData = semanticGraphs[index];
			var defaultOptions = { "root": "", "properties": [], "ignore_properties": [], "permalink": false, "sync_permalink": false, "edit": false, "hint": false, "treat_non_existing_pages_as_literals": false, "edge_labels": true };
			defaultOptions.legacy_mode = mw.config.get( 'wgPageName' ).split(":")[0] === "Term";
		
			var config = $.extend(defaultOptions, graphData );		
			var graph = new isg.Graph(this, config);
	 
        });
    });
});
