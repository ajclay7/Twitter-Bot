const config = require('./config');
const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {
	// connect to twitter via api
	const client = new Twitter({
		consumer_key: config.consumer_key,
		consumer_secret: config.consumer_secret,
		access_token_key: config.access_token_key,
		access_token_secret: config.access_token_secret,
	});

	// Pull next tweet from spreadsheet
	const sheet = new Sheet();
	await sheet.load();
	const quotes = await sheet.getRows();
	const status = quotes[0].quote;

	// Send tweet
	client.post('statuses/update', { status }, function (error, tweet, response) {
		if (error) throw error;
		console.log(tweet); // Tweet body.
	});

	// Remove quote form spreadsheet
	await quotes[0].delete();

	console.log('tweeted', quotes[0].quote);
})();

// use a npm cronjob to schedule out tweets
// crontab.guru

// Write some logic for what to do when it runs out of rows
