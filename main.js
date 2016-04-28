var async = require('async');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var _ = require('underscore');

var fs = require('fs');

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

	// Pluck the individual tag or category values 
	// that we loaded from the csv file exported from Quicken, and then MySQL.
	var tags = _.pluck(results[0], 'tag');
	var cats = _.pluck(results[1], 'Category');

	// Find the category name for every category...
	// Categories are heirarchical almost like directories seperated by a ":" instead of a "\"
	// So here we take only the last category in the path...flattening the directory structure.
	var catsTail = _.map(cats, function(cat) { return _.last(cat.split(":")).toLowerCase(); });

	// Tags are not heirarchical, however, transactions with more than one tag are separated with ":"
	// (What the hell quicken you couldn't use a , or space like everybody else does with tags?)
	// 
	// So here we break them down into unique sets of tags that have one, or more-than-one tag.
	// And then we split them out by their seperator, and then add the ones that are split to a
	// single tag to the oneTag list, and the ones that have more-than-one-tag to the moreThanOneTag
	// list.
	var moreThanOneTag = _.filter(tags, function(tag) { return _.size(tag.split(":")) > 1; });
	var oneTag = _.filter(tags, function(tag) { return _.size(tag.split(":")) == 1; });

	// Make oneTag Lowercase
	oneTag = _.map(oneTag, function(aTag) { return aTag.toLowerCase(); });

	var x = []; // temp array for determining unqiue tags.
	var uniqueTags = [];
	var a = []; 
	var common = [];

	// Split each tag out of the moreThanOneTag list, and then put it into the array individually, 
	// removing duplicates.
	_.map(moreThanOneTag, function(t) { x = _.union(t.toLowerCase().split(":"), x); });
	// Add the tags that were by themselves and remove the duplicates.
	uniqueTags = _.union(x, oneTag);
	
	// Now we can find what we came here for...a list of tags for which there is a 
	// category without an equivalent.
	z = _.difference(uniqueTags, catsTail); // The tags that do not have an equivalent category
	a = _.difference(catsTail, uniqueTags); // The categories that do not have an equivalent tag
	common = _.intersection(uniqueTags, catsTail); // The tags and categories that are in common.

	// Output the rest of the infomration so we can look at our result:
	console.log("Tags that do not have an equivalent category:");
	console.log(z);

	console.log("Number of Tags that do not have an equivalent category: (result): " + z.length);
	console.log("Number of Categories that do not have an equivalent tag (don\'t care): " + a.length);
	console.log("Number of Common Tags and Categories:" + common.length);

	console.log("---------------------------------------");

	// Print out the total number of tags from each.
	console.log("Number of Unique Tags: " + uniqueTags.length);
	console.log("Number of Unique Categories: " + catsTail.length);

});
