const multer = require("multer");
const path = require("path");
const model = require("../Models/upload");

let storage = multer.diskStorage({
	destination: function (req, res, cb){
		cb(null, "./public/images");
	}, filename: function(req, file, cb){
		const newFilename = `${Date.now()}-${file.originalname}`;
		cb(null, newFilename);
	}
});

let limits = {
	filesize: 1 * 1000 * 1000
};

let fileFilter = (req, file, cb) => {
	const mime =  /jpg|webp|gif|png|jpeg|svg/;
	const extName = mime.test(path.extname(file.originalname).toLowerCase());

	if(extName) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

let upload = multer({storage, limits, fileFilter});

let uploadController = {
	uploadImage: (req, res) => {
		const uploadImage = upload.single("image");
		uploadImage(req, res, (err) => {
			console.log(req.file);
			if(!req.file){
				res.status(400).send({
					success: false,
					message: "Only Image!"      
				});
			}else {
				if(!err){
					const photo = req.file;
					const myId = req.id;

					model.uploadImage(photo, myId)
						.then(() => {
							res.status(200).send({
								success: true,
								message: "Success",
								data: `${process.env.BASE_URL}/images/${req.file.filename}`
							});
						})

						.catch(() => {
							res.status(500).send({
								success: false,
								message:  "Internal Server Error"    
							});
						});

				} else {
					res.status(400).send({
						error: err.message
					});
				}
			}
		});
	}
};

module.exports =  uploadController;