var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var _ = require('underscore');

var fs = require('fs');

converter.on("end_parsed", function(json_Array) {
	var arr = ['tools', 'visa', 'disco']
	var result = _(json_Array).select(function(tag) { return tag.tag; } );
	var plucked = _(json_Array).pluck('tag').map(function (value) {return value;});

	// An object to store our results in...
	var allofm = {};

	// Store our results
	allofm['diffLeft'] = _.difference(plucked, arr);  // What didn't match in plucked
	allofm['diffRight'] = _.difference(arr, plucked); // What didn't match in arr
	allofm['common'] =  _.intersection(plucked, arr); // What matched in both (INNER JOIN)

	// Display results using "map() for Objects"
	_.mapObject(allofm, function(val, key) {
		console.log(key + ':' + val.length);
	});

});

fs.createReadStream("csv/tags.csv").pipe(converter);
