const model = require("../Models/profile.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const profileController = {
  getAll: (req, res) => {
    const myId = req.id;
    const {page, limit} =  req.query;

      model
        .getAll(page, limit, myId)
        .then((result) => {

          var newData = result.map(function(result) {
            return {
              id : result.id_profile,
              photo: result.photo,
              firstName : result.name,
              email : result.email
            }
          });

          res.status(200).send({
            success: true,
            message: "Success",
            data: newData,
          });

        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
          });
        });

  },

  getId: (req, res) => {

    let {id} = req.params

      model.getId(id)
        .then((result) => {
          if (result.length) {

            const id = result[0].id_profile
            const name = result[0].name
            const email = result[0].email
            const photo = result[0].photo
            const phone = result[0].phone

            res.status(200).send({
              success: true,
              message: "Success",
              data: {id, name, email, photo, phone}
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Id not found",
              data: [],
            });
          }
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
        });
  },

  getName: (req, res) => {
    const { name, page, limit } = req.query;
    const myId =  req.id; 
      model
        .getName(name, myId)
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
              message: "Name not found",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            
          });
        });
  },

  getUserByToken: (req, res) => {
    const id = req.id

    model.getId(id)
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
          message: "Id not found",
          data: [],
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message,
        data: [],
      });
    });
  },

  patchProfile: (req, res) => {
    const id = req.id;

      const { name, email, password, phone, pin, device_token } = req.body

      const p =req.body
      let newData

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hashedPassword) { 


        if(password){
          newData = { ...p, password : hashedPassword}
        } else {
          newData = p
        }


      const data = Object.entries(newData).map((item) => {
        return parseInt(item[1]) > 0
          ? `${item[0]}=${item[1]}`
          : `${item[0]}='${item[1]}'`;
      });

      model
        .patchProfile(
          name,
          email,
          phone,
          password,
          pin,
          device_token,
          id,
          data
        )

        .then((result) => {
          if (name || email || phone || password || pin || device_token) {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: "Success",
                data: req.body,
              });
            } else {
              res.status(400).send({
                success: false,
                message: "Id not found",
                data: [],
              });
            }
          } else {
            res.status(400).send({
              success: false,
              message: "Fields must be filled",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: err.message,
          });
        });
      })
    })

  },

  deleteProfile: (req, res) => {
    const { id } = req.params;

    if (id == req.id || req.role == 21) {
      model
        .deleteProfile(id)
        .then((result) => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: "Success Delete Profile!",
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
            message: "Internal Server Error",
          });
        });
    } else {
        res.status(403).send({
            success: false,
            message: "Not Found",
    })
  }
},

  cekPassword: (req, res) => {
    const { password, realpw} = req.body
    model.cekPassword(password, realpw)
    .then((result) => {
      res.status(200).send({
        success: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err, 
      });
    });
  },

  cekPin: (req, res) => {
    const { id, pin } = req.body;

      model.cekPin(id, pin)
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
              message: "Wrong!",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
          });
        });

  },

	updateToken: (req, res) => {
    const {device, email} = req.body
    
    model.updateToken(device, email)
    .then((result) => {
      if (device || email ) {
        if (result.affectedRows) {
          res.status(200).send({
            success: true,
            message: "Success",
            data: req.body,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Not found",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Fields must be filled",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    });

	}

};

module.exports = profileController;
