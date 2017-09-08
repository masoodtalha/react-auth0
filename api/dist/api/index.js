'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _search = require('../models/search');

var _search2 = _interopRequireDefault(_search);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	api.post('/search', function (req, res, next) {
		var searchString = req.body.searchString.trim();
		if (searchString.length < 10) {
			res.json('minimum search size not met');
			return;
		}
		var objSearch = {
			search: searchString,
			ip: req.connection.remoteAddress
		};
		var search = new _search2.default(objSearch);
		search.save().then(function (savedSearch) {
			return res.json(savedSearch);
		}).catch(function (e) {
			return next(e);
		});
	});

	api.post('/addzendesk', function (req, res, next) {
		console.log("request started");
		var headers = {
			'Content-Type': 'application/json'
		};
		var _dataToSend = {};
		_dataToSend["name"] = req.body.name;
		_dataToSend["email"] = req.body.email;
		_dataToSend["role"] = "agent";
		var dataString = JSON.stringify({ "user": _dataToSend });

		var options = {
			url: 'https://masoodtalha.zendesk.com/api/v2/users.json',
			method: 'POST',
			headers: headers,
			body: dataString,
			auth: {
				'user': 'masoodtalha7@gmail.com',
				'pass': 'pakistan100'
			}
		};

		var callback = function callback(error, response, body) {
			console.log(dataString);
			console.log(body);
			if (!error && response.statusCode == 200) {
				res.json('Added Successfully');
				return;
				//this.props.history.replace('/')
				console.log(body);
			} else {
				console.log(error);
			}
		};

		(0, _request2.default)(options, callback);

		res.json('Done');
		return;
	});

	return api;
};
//# sourceMappingURL=index.js.map