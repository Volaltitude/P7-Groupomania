const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use(
	helmet({
		CrossOriginRessourcePolicy: false,
		CrossOriginEmbedderPolicy: false,
	})
);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	res.removeHeader("Cross-Origin-Ressource-Policy");
	res.removeHeader("Cross-Origin-Embedder-Policy");
	next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
//app.use("/api/post", postRoutes);


module.exports = app;
