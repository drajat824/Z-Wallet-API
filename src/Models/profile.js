const db = require("../Helpers/database");
const bcrypt = require("bcrypt");

const profileModel = {
  getAll: (page, limit, myId) => {
    if (!page) page = 1;
    else page = parseInt(page);

    if (!limit) limit = 4;
    else limit = parseInt(limit);

    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM profile where id_profile != ${myId} ORDER by name ASC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err);
        }
      });
    });
  },

  getId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM profile WHERE id_profile = ?`,[id] , (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getName: (name, myId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_profile, photo, name, email FROM profile WHERE name LIKE "${name}%" 
      and id_profile != ${myId} ORDER by name ASC`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  patchProfile : ( name, email, phone, password, pin,device_token, id, data) => {

    return new Promise((resolve, reject) => { 
        db.query(`UPDATE profile SET ${data} WHERE id_profile=${id}`, (err, result) => {
            if(err) {
                reject(new Error(err));
            } else{
                resolve(result);
            }
          })
    });
},

  deleteProfile: (id)=> {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM profile WHERE id_profile = ${id}`, (err, result) => {
            if(err){
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
},

  cekPassword : ( password, realpw ) => {

    return new Promise( (resolve, reject) => {
      bcrypt.compare(password, realpw, (err, result) => {
            if(err) {
              reject('Salah');
            } else if(!result) {
              reject('Salah')
            }else{
              resolve('Benar');
          }
          })

    })
  },

  cekPin: (id, pin) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM profile WHERE id_profile = ${id} && pin = ${pin}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

updateBalance(data) {
  const { balance, id } = data;
  return new Promise((resolve, reject) => {
  db.query("UPDATE profile SET balance = ? WHERE id_profile = ?", [balance, id], (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })
  });
},

updateToken(device, email) {

  return new Promise((resolve, reject) => {
  db.query(`UPDATE profile SET device_token = '${device}' WHERE email = '${email}'`,(err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })
  });
}

};

module.exports = profileModel;
