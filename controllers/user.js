import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { db } from "../mysql.js";

export const signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const sql = `INSERT INTO user SET ?`;
			req.body.password = hash;
			db.query(sql, req.body, (err, result) => {
				if (err) throw err;
				res.status(201).json({ message: "User added..." });
			});
		})
		.catch((err) => res.status(500).json({ err }));
};

export const login = (req, res, next) => {
	const sql = `SELECT password from user where email = "${req.body.email}"`;
	db.query(sql, (err, result) => {
		console.log(result);
		if (err) throw err;
		if (result.length == 0)
			return res.status(401).json({ error: "Utilisateur non trouvé" });
		bcrypt
			.compare(req.body.password, result[0].password)
			.then((valid) => {
				if (!valid)
					return res
						.status(401)
						.json({ error: "Mot de passe incorrect" });
				res.status(200).json({
					token: jwt.sign(
						{ userId: req.body.email },
						`${process.env.JWT_KEY}`,
						{ expiresIn: "24h" }
					),
				});
			})
			.catch((err) => res.status(500).json({ err }));
	});
};
