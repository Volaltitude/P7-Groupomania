import express from "express";
import { router as userRoutes } from "./routes/user.js";
import { router as postRoutes } from "./routes/post.js";
import helmet from "helmet";
import "dotenv/config";
import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

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
app.use("/api/post", postRoutes);

export { app };
