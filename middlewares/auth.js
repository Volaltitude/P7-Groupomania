import jwt from "jsonwebtoken";
import "dotenv/config";

export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
		const userId = decodedToken.userId;
		req.auth = { userId };
		if (req.body.userId && req.body.userId !== userId)
			throw "User ID non valable !";
		else next();
	} catch (err) {
		res.status(403).json({ error: err | "Requête non authentifiée !" });
	}
};
