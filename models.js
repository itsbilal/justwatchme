
var mongoose = require("mongoose");

mongoose.connect();

mongoose.model("Device", {
	id: String,
	type: Number,

	watches: [mongoose.Schema.Types.ObjectId]
});

mongoose.model("Page", {
	url: String,
	lastHash: String,

	watchers: Number
});