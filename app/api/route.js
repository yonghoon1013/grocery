var mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.S_HOST,
	user: process.env.S_USER,
	password: process.env.S_PASSWORD,
	database: process.env.S_DATABASE,
	port: process.env.S_PORT
});























// });

connection.connect();


export async function queryExecute(str, value) {
	let data = await new Promise((resolve, reject) => {
		connection.query(str, value, function (error, results) {
			resolve(results);
		});
	});
	return data;
}
