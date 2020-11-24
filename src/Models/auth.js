const db = require("../Helpers/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          }
          const query = "INSERT INTO profile SET ?";
          db.query(query, newBody, (err, result) => {
            if (!err) {
              resolve(newBody);
            } else {
              if(err.code == "ER_DUP_ENTRY") {
                reject(err)
              } else {
                reject(err);
              }
            }
          });
        });
      });
    });
  },

  registerPin : (body) => {
    return new Promise((resolve, reject) => { 
      const {email, pin} = body
      db.query (`UPDATE profile SET pin=${pin} WHERE email='${email}'`, (err, result) => {
        if(err) {
          reject(new Error(err));
      } else{
          resolve(result);
      }
      })
    })
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const query = "SELECT * FROM profile WHERE email=?";
      db.query(query, email, (err, data) => {
        let dataUser = data[0];
        if (!data.length) {
          reject("Email Salah.");
        } else {
          if (!err) {
            
            const role = dataUser.role
            const token = jwt.sign(
              {
                id: dataUser.id_profile,
                role_id: dataUser.role,
                pin: dataUser.pin
              },
              process.env.SECRET_KEY
            );

            const hasil = {role, token}

            bcrypt.compare(password, dataUser.password, function (err, result) {
              if (err) {
                reject("Password Salah");
              } else {
                if (!result) {
                  reject("Password Salah");
                } else {
                  const sql = "SELECT * FROM profile WHERE password=?";
                  db.query(sql, dataUser.password, (err, data) => {
                    if (!err) {
                      resolve(hasil);
                    } else {
                      reject("Password Salah");
                    }
                  });
                }
              }
            });
          } else {
            reject(err);
          }
        }
      });
    });
  },
};

module.exports = authModel;
