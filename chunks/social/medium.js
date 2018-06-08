const fs = require('fs')

const mediumObj = JSON.parse(fs.readFileSync('./mediumFollowers.json', 'utf8'))
const db = JSON.parse(fs.readFileSync('./dbExample.json', 'utf8'))


const verifiedAccounts = [];
for ( let key in db ) {
	for (let mediumKey in mediumObj["payload"]["references"]["User"]) {
		let userName = db[key].medium
		if (db[key] && userName) userName = userName.replace(/@.*$/, '');
		if (typeof (db[key]) !== undefined && mediumObj["payload"]["references"]["User"][mediumKey].username === userName) {
			verifiedAccounts.push(db[key])
		}
	}
}

console.log(verifiedAccounts);