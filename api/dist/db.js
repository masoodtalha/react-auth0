'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// plugin bluebird promise in mongoose
_mongoose2.default.Promise = _bluebird2.default;

exports.default = function (callback) {
	// connect to a database if needed, then pass it to `callback`:
	_mongoose2.default.connect('mongodb://127.0.0.1/gharmine', { server: { socketOptions: { keepAlive: 1 } } });
	_mongoose2.default.connection.on('error', function () {
		throw new Error('unable to connect to database: gharmine');
	});

	callback();
};
//# sourceMappingURL=db.js.map