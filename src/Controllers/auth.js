const model = require("../Models/auth.js");

const authControl = {
  register: (req, res) => {
    let {name, email, password, pin} = req.body

    if(name && email && password || pin){

    model.register(req.body)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Register Success",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          succes: false,
          message: err,
        });
      });
    } else {
      res.status(400).send({
        success: true,
        message: "Must Be Filled!",
      });
    }
  },

  registerPin: (req, res) => {
    let {email, pin} = req.body

    model.registerPin(req.body)

    .then((result) => {
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: "Success Create Pin",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Email Not Found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Email Has Been Used",
      });
    });

  },

  login: (req, res) => {
    let {email, password} = req.body
    if(email && password) {
    model.login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Success!",
          data: {role: data.role,
          token: data.token}
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err,
        });
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Must Be Filled",
      });
    }
  },
};

module.exports = authControl;
