const model = require("../Models/transfer")
const {getId, updateBalance} = require("../Models/profile")
var admin = require('firebase-admin');
var serviceAccount = require("./../../public/file/serviceAccountKey.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://zwallet-drajat.firebaseio.com"
});
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
					console.log(result)
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

	async postTransfer(req, res) {
		const myId = req.id;
		let { id_sender, id_receiver, amount, notes } = req.body;
		amount = parseInt(amount)

			try {

				const checkFrom = await getId(myId)
				if (!checkFrom.length)
				  return res.status(400).json({
					status: false,
					message: "ID User from isn't available"
				  })

				  const checkTo = await getId(id_receiver)
				  if (!checkTo.length)
					return res.status(400).json({
					  status: false,
					  message: "ID User To isn't available"
					})
					
					if(myId == id_receiver)
					return res.status(400).json({
						status: false,
						message: "You cannot transfer to yourself"
					})

					const photo_receiver = checkTo[0].photo
					const name_receiver = checkTo[0].name
					const currentBalanceFrom = checkFrom[0].balance
					const currentBalanceTo = checkTo[0].balance
					if (currentBalanceFrom < amount)
					  return res.status(400).json({
						status: false,
						message: "Balance is not enough"
					  })

					  await updateBalance({ id: myId, balance: currentBalanceFrom - amount })
					  await updateBalance({ id: id_receiver, balance: currentBalanceTo + amount })
				
					  await model.postTransfer(id_sender, id_receiver, amount, notes, myId, photo_receiver, name_receiver)
				
					  res.status(200).json({
						status: true,
						message: "Transfer has successfully"
					  })

					var token = checkTo[0].device_token
					const options = {
					priority: "high",
					timeToLive: 60 * 60 * 24
					};
					var payload = {
					notification: {
						title: 'New Transaction!'
					}
					}

					if (checkTo[0].device_token == null || checkTo[0].device_token == '' ){
						console.log('Transfer successful, but no notification')
					} else {

					admin.messaging().sendToDevice(token, payload, options)
					.then(function(response){
						console.log('Berhasil Kirim Notif')
					})
					.catch(function(error){
						console.log('Errornya', error)
					})

					}

			}

			catch(err){
				res.status(500).send({
					success: false,
					message: err.message
				});
				console.log(photo_receiver)
			}
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
	},

	getTransferWeek: (req, res) => {
		const myId = req.id;
		const myRole = req.role;

		const { limit, page } = req.query;
		model
			.getTransferWeek(limit, page, myId, myRole)
			.then((result) => {
				if (result.length) {
					res.status(200).send({
						success: true,
						message: "Success",
						data: result,
					});
				} else {
					console.log(result)
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

	getTransferMonth: (req, res) => {
		const myId = req.id;
		const myRole = req.role;

		const { limit, page } = req.query;
		model
			.getTransferMonth(limit, page, myId, myRole)
			.then((result) => {
				if (result.length) {
					res.status(200).send({
						success: true,
						message: "Success",
						data: result,
					});
				} else {
					console.log(result)
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

};

module.exports = transferController;
