const Twitter = require ('twitter')

const client = new Twitter({
	access_token_key: ''
})

const params = {
	user_id: 849617843872309248,
	screen_name: 'carmelplatform',
	count: 200
}

client.get('followers/list', params, (error, data, resp) => {
	// console.log(error);
	console.log(data);
	// console.log(resp);
})

