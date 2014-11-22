
require('../models');

var mongoose = require('mongoose');
var Page = mongoose.model("Page");

var request = require('request');
var pageHash = require('../helpers/pageHash');

setInterval(function() {
	Page.find().sort('-watchers').exec(function(err, pages) {
		pages.forEach(function(page){
			pageHash(page.url, function(err, hash){
				if (hash !== page.lastHash) {
					page.lastHash = hash;
					page.save();

					// Send notification to all watchers of page
					console.log("Page ", page.url, " was just updated.");
				}
			});
		});
	});
}, 1000*30);