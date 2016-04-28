var async = require('async');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var _ = require('underscore');

var fs = require('fs');

/*fs.createReadStream("csv/tags.csv").pipe(converter);*/

var files = ['csv/tags.csv','csv/categories.csv'];
var readStreams = [];

files.forEach(function( file ) {
	readStreams.push(function(callback) {
		var converter = new Converter({});
		fs.createReadStream( file )
		  .pipe(converter)
		  .on('end_parsed', function(jsonArray) {
			callback(null, jsonArray);
		   });
	});
});

async.parallel(readStreams, function(err, results) {
	var tags = _.pluck(results[0], 'tag');
	var cats = _.pluck(results[1], 'Category');

	var catsTail = _.map(cats, function(cat) { return _.last(cat.split(":")).toLowerCase(); });
	var moreThanOneTag = _.filter(tags, function(tag) { return _.size(tag.split(":")) > 1; });
	var oneTag = _.filter(tags, function(tag) { return _.size(tag.split(":")) == 1; });

	var x = [];

	_.map(moreThanOneTag, function(t) { x = _.union(t.split(":"), x); });

	console.log(x);
});
