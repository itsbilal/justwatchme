
var mongoose = require("mongoose");

mongoose.connect();

mongoose.model("Device", {
	device_id: String,
	device_type: Number, // 0 for iOS, 1 for Android

	watches: [mongoose.Schema.Types.ObjectId]
});

mongoose.model("Page", {
	url: String,
	lastHash: String,

	watchers: {type: Number, default: 0}
});