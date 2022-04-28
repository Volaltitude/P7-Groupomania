const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: `${process.env.DB_KEY}`,
	database: "Groupomania",
});

db.connect((err) => {
	if (err) throw err;
	console.log("Connecté à la base de données MySQL Groupomania");
});

module.exports = db;
