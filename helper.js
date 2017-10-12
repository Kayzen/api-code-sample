var urlencode = require('urlencode');

function urlEncodeJson(payload) {
	var encodedParams = [];
	Object.keys(payload).forEach(key => {
		encodedParams.push(key + "=" + urlencode(payload[key]));
	});
	return encodedParams.join("&");
}

exports.urlEncodeJson = urlEncodeJson;