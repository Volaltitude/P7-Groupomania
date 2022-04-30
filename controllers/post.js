const fs = require("fs");
const db = require("../mysql");
const DB = require("../mysql").promise();

exports.getAllPosts = (req, res, next) => {
	let sql = `SELECT * FROM post`;
	db.query(sql, (err, result) => {
		console.log(result);
		if (err) throw err;
		if (result.length == 0)
			return res.status(404).json({ error: "Aucun post trouvé" });
		res.send(result);
	});
};

exports.getOnePost = (req, res, next) => {
	let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length == 0)
			return res.status(404).json({ error: "Aucun post trouvé" });
		res.send(result);
	});
};

exports.createPost = (req, res, next) => {
	let sql = `INSERT INTO post (body, date, user_id) VALUES ("${req.body.body}", NOW(), ${req.body.user_id})`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
};

exports.modifyPost = async (req, res, next) => {
	try {
		const roleResult = await DB.query(
			`SELECT role FROM user WHERE id = ${req.body.id}`
		);
		const userRole = roleResult[0][0];
		const idResult = await DB.query(
			`SELECT user_id FROM post WHERE id = ${req.params.id}`
		);
		const userId = idResult[0][0];
		if (
			userRole.role !== "admin" &&
			userRole.role !== "moderator" &&
			userId.user_id !== req.body.id
		)
			throw new Error("Action non autorisée");
		DB.query(
			`UPDATE post SET body = "${req.body.body}", date = NOW() WHERE id = ${req.params.id}`
		);
		res.send("Post modifié");
	} catch (err) {
		res.status(401).send(err);
        console.error(err)
	}
};
