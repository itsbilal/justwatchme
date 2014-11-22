
var request = require('request');
var crypto = require('crypto');

module.exports = function(url, callback) {
	var shasum = crypto.createHash("sha1");

	request(url, function(err, request, body){
		if (err) {
			callback(err, null);

			return;
		}

		shasum.update(body);

		var hash = shasum.digest('hex');

		callback(null, hash);

	});
};