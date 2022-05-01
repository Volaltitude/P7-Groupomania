import multer from "multer";

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
    "image/gif": "gif"
};
const storage = multer.diskStorage({
	destination: (res, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + "_" + Date.now() + "." + extension);
	},
});

export default multer({ storage }).single("image");
