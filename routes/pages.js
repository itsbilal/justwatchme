
var mongoose = require("mongoose");
var Page = mongoose.model("Page");
var Device = mongoose.model("Device");

var express = require("express");
var router = express.Router();

var crypto = require("crypto");
var request = require("request");

var pageHash = require('../helpers/pageHash');

router.post("/add/", function(req, res) {
	var page = new Page({
		url: req.body.url,
		watchers: 0
	});

	pageHash(req.body.url, function(err, hash){

		if (err) {
			res.status(500).send({
				error: "Wrong and/or invalid URL"
			});

			return;
		}

		page.lastHash = hash;
		page.save(function(err, page){
			if (!err) {
				res.send({success: 1, id: page._id});
			}
		});
	});
});

router.get("/popular/", function(req, res) {
	Page.find().sort("-watchers").exec(function(err, pages) {
		res.send({
			pages: pages.map(function(page){
				return  {
					url: page.url,
					watchers: page.watchers
				}
			})
		});
	})
});

router.post("/page/:id/watch", function(req, res) {
	var device_id = req.body.device_id;
	var device_type = parseInt(req.body.device_type);

	Page.findById(req.params.id, function(err, page) {
		if (err || !page) {
			res.status(404).send({error: "Page not found"});
			return;
		}

		Device.findOne({device_id: device_id, device_type:device_type}, function(err, device){
			var addWatch = function(deviceId) {
				page.watchers += 1;
				page.save();
			};

			if (err || !device) {
				device = new Device();
				device.device_id = device_id;
				device.device_type = device_type;
				device.watches = [page._id];
				
			} else {
				if (typeof(device.watches) !== "undefined") {
					device.watches.push(page._id);
				} else {
					device.watches = [page._id];
				}
			}

			device.save(function(err) {
				addWatch();
			});

		});
	});
});

module.exports = router;