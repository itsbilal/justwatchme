
var request = require('request');

module.exports = function(url, callback) {
	var shasum = crypto.createHash("sha1");

	request(req.body.url).on('error', function(err){
		if (err) {
			callback(err, null);

			return;
		}
	}).on('data', function(data){
		shasum.update(data);
	}).on('end', function(){
		var hash = shasum.digest();

		callback(null, hash);
	});
};