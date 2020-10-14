const model = require("../Models/transfer");

const transferController = {
	getAll: (req, res) => {
		const myId = req.id;
		const myRole = req.role;

		const { limit, page } = req.query;
		model
			.getAll(limit, page, myId, myRole)
			.then((result) => {
				if (result.length) {
					res.status(200).send({
						success: true,
						message: "Success",
						data: result,
					});
				} else {
					res.status(400).send({
						success: false,
						message: "Data Not Found",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					success: false,
					mesage: err.message,
				});
			});
	},

	postTransfer: (req, res) => {
		const myId = req.id;
		const { id_sender, id_receiver, amount, notes } = req.body;

		model
			.postTransfer(id_sender, id_receiver, amount, notes, myId)
			.then(() => {
				res.status(200).send({
					success: true,
					message: "Success Post Transfer",
					data: req.body,
				});
			})
			.catch((err) => {
				res.status(500).send({
					success: false,
					message: err.message,
				});
			});
	},

	deleteTransfer: (req, res) => {
		const { id } = req.params;

		if (req.role == 21) {
			model
				.deleteTransfer(id)
				.then((result) => {
					if (result.affectedRows) {
						res.status(200).send({
							success: true,
							message: "Success Delete Transfer",
							data: result,
						});
					} else {
						res.status(400).send({
							success: false,
							message: "Id Not Found!",
						});
					}
				})
				.catch((err) => {
					res.status(500).send({
						success: false,
						message: err.message,
					});
				});
		} else {
			res.status(403).send({
				success: false,
				message: "Not Found",
			});
		}
	},

	patchTransfer: (req, res) => {
		const {id} = req.params;
		const {id_sender, id_receiver, amount, notes, date} = req.body;

		if(req.role == 21) {

			const data = Object.entries(req.body).map((item) => {
				return parseInt(item[1]) > 0
					? `${item[0]}=${item[1]}`
					: `${item[0]}='${item[1]}'`;
			});

			model.patchTransfer(id_sender, id_receiver, amount, notes, date, id, data)
				.then((result) => {
					if(result.affectedRows){
						res.status(200).send({
							success: true,
							message: "Success Update Transfer!",
							data: result
						});
					} else {
						res.status(400).send({
							success: false,
							message: "Id Not Found",
						});
					}
				})
				.catch(() => {
					res.status(500).send({
						success: false,
						message: "Internal Server Error"
					});
				});
		}else {
			res.status(403).send({
				success: false,
				message: "Not Found"
			});
		}
	}
};

module.exports = transferController;
