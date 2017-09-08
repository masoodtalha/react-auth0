import Promise from 'bluebird';
import mongoose from 'mongoose';

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect('mongodb://127.0.0.1/gharmine', { server: { socketOptions: { keepAlive: 1 } } });
	mongoose.connection.on('error', () => {
	  throw new Error(`unable to connect to database: gharmine`);
	});

	callback();
}
