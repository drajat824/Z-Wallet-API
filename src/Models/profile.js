const db = require("../Helpers/database");


const profileModel = {
  getAll: (page, limit, myId) => {
    if (!page) page = 1;
    else page = parseInt(page);

    if (!limit) limit = 99;
    else limit = parseInt(limit);

    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM profile where id_profile != ${myId} ORDER by first_name ASC
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
      db.query(`SELECT * FROM profile WHERE id_profile = ${id}`, (err, result) => {
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
      db.query(`SELECT id_profile, photo, first_name, last_name, email FROM profile WHERE first_name LIKE "${name}%" 
      and id_profile != ${myId} ORDER by first_name ASC`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  patchProfile : ( first_name, last_name, email, phone, password, pin, id, data) => {

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

};

module.exports = profileModel;
