const db = require("../Helpers/database");

const topupModel = {
	getAll: (limit, page) => {
		if (!limit) limit = 8;
		else limit = parseInt(limit);

		if (!page) page = 1;
		else page = parseInt(page);

		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM topup ORDER BY number LIMIT ${limit} OFFSET ${
					(page - 1) * limit
				}`,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(err);
					}
				}
			);
		});
	},

	patchTopup: (number, step, id, data) => {
		return new Promise((resolve, reject) => {
			db.query(`UPDATE topup SET ${data} WHERE id=${id}`, (err, result) => {
				if (err) {
					reject(new Error(err));
				} else {
					resolve(result);
				}
			});
		});
	},

	deleteTopup: (id) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM topup WHERE id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	postTopup: (number, step) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO topup (number, step) VALUES ('${number}', '${step}')`,
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},
};

module.exports = topupModel;
