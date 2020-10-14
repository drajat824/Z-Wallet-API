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
              firstName : result.first_name,
              last_name : result.last_name,
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
    const { id } = req.params;

    if (id == req.id || req.role == 21) {
      model
        .getId(id)
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
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
        });
    } else {
      res.status(403).send({
        success: false,
        message: "Not Found",
      });
    }
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

  patchProfile: (req, res) => {
    const { id } = req.params;

    if (id == req.id || req.role == 21) {
      const { first_name, last_name, email, password, phone, pin } = req.body

      const p =req.body


      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hashedPassword) { 

         const newData = { ...p, password : hashedPassword}
         
      const data = Object.entries(newData).map((item) => {
        return parseInt(item[1]) > 0
          ? `${item[0]}=${item[1]}`
          : `${item[0]}='${item[1]}'`;
      });

      model
        .patchProfile(
          first_name,
          last_name,
          email,
          phone,
          password,
          pin,
          id,
          data
        )

        .then((result) => {
          if (first_name || last_name || email || phone || password || pin) {
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
    } else {
      res.status(403).send({
        success: false,
        message: "Not Found",
      });
    }

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
};

module.exports = profileController;
