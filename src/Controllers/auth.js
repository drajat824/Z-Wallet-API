const model = require("../Models/auth.js");

const authControl = {
  register: (req, res) => {
    let {first_name, email, password, phone, pin} = req.body

    if(first_name && email && password && phone && pin){

    model.register(req.body)
      .then((newBody) => {
        res.status(201).send({
          success: true,
          message: "Register Success",
          data: newBody,
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

  login: (req, res) => {
    let {email, password} = req.body
    if(email && password) {
    model.login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Success!",
          token: data,
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
