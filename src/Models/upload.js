const db = require("../Helpers/database");

const uploadModel = {
	uploadImage:(photo, myId)=> {
		console.log(myId);
		return new Promise((resolve, reject) => {
			db.query(`UPDATE profile SET photo = '${photo.filename}' WHERE id_profile=${myId}`, (err, result) => {
				if(!err){
					resolve(result);
				} else {
					reject(err);
				}
			});   
		});
	}
};

module.exports = uploadModel;
