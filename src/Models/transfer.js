const db = require("../Helpers/database");

const transferModel = {
  getAll: (limit, page, myId, myRole) => {
    if (!page) page = 1;
    else page = parseInt(page);

    if (!limit) limit = 99;
    else limit = parseInt(limit);

      return new Promise((resolve, reject) => {
        db.query(
          `SELECT transfer.id_sender, profile.photo, profile.name, profile.balance, transfer.id_receiver, transfer.photo_receiver, transfer.name_receiver,
        transfer.amount, transfer.notes, transfer.date FROM profile INNER JOIN transfer ON 
        profile.id_profile = transfer.id_sender WHERE transfer.id_sender = ${myId} OR transfer.id_receiver = ${myId} ORDER BY transfer.date ASC LIMIT ${limit} 
        OFFSET ${(page - 1) * limit}`,
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

  postTransfer: (id_sender, id_receiver, amount, notes, myId, photo_receiver, name_receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT into transfer SET id_sender = ${myId}, id_receiver =  ${id_receiver}, amount = ${amount}, notes ='${notes}', photo_receiver = '${photo_receiver}', name_receiver = '${name_receiver}'`,
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

  deleteTransfer: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM transfer WHERE id_transfer = ${id}`,
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

  patchTransfer: (id_sender, id_receiver, amount, notes, date, id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE transfer SET ${data} WHERE id_transfer=${id}`,
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

module.exports = transferModel;
