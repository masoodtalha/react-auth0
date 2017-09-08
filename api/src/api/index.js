import { version } from '../../package.json';
import { Router } from 'express';
import Search from '../models/search';
import Request from 'request';

export default ({ config, db }) => {
	let api = Router();

	api.post('/search', (req, res, next) => {
		const searchString = req.body.searchString.trim();
		if(searchString.length < 10){
			res.json('minimum search size not met')
			return;
		}
		const objSearch = {
			search: searchString,
			ip: req.connection.remoteAddress
		};
		const search = new Search(objSearch);
		  search.save()
		    .then(savedSearch => res.json(savedSearch))
		    .catch(e => next(e));
	});

	api.post('/addzendesk', (req, res, next) => {
		console.log("request started")
		const headers = {
	      'Content-Type': 'application/json'
	    };
	    let _dataToSend = {};
	    _dataToSend["name"] = req.body.name;
	    _dataToSend["email"] = req.body.email;
	    _dataToSend["role"] = "agent";
	    const dataString = JSON.stringify({"user": _dataToSend});

	    const options = {
	      url: 'https://masoodtalha.zendesk.com/api/v2/users.json',
	      method: 'POST',
	      headers: headers,
	      body: dataString,
	      auth: {
	          'user': 'masoodtalha7@gmail.com',
	          'pass': 'pakistan100'
	      }
	    };

	    const callback = function(error, response, body) {
	    	console.log(dataString);
	    	console.log(body);
	      if (!error && response.statusCode == 200) {
				res.json('Added Successfully')
				return;
	          //this.props.history.replace('/')
	          console.log(body);
	      }
	      else{
	      	console.log(error)
	      }
	    }

	    Request(options, callback);

	    res.json('Done')
		return;
	});

		return api;
}
