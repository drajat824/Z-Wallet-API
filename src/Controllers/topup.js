const model = require("../Models/topup.js");

const topupController = {
  getAll: (req, res) => {
    const { limit, page } = req.query;

    model
      .getAll(limit, page)
      .then((result) => {
        res.status(200).send({
          success: true,
          message: "Success Get Topup!",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      });
  },

  patchTopup: (req, res) => {
    const { id } = req.params;

    if (req.role == 21) {
      const { number, step } = req.body;
      const data = Object.entries(req.body).map((item) => {
        return parseInt(item[1]) > 0
          ? `${item[0]}=${item[1]}`
          : `${item[0]}='${item[1]}'`;
      });

      model
        .patchTopup(number, step, id, data)

        .then((result) => {
          if (number || step) {
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
            message: "Internal Server Error",
          });
        });
    } else {
      res.status(403).send({
        success: false,
        message: "Not Found",
      });
    }
  },

  deleteTopup: (req, res) => {
    const { id } = req.params;

    if (req.role == 21) {
      model
        .deleteTopup(id)
        .then((result) => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: "Success Delete Topup!",
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
      });
    }
  },

  postTopup: (req, res) => {
    const { number, step } = req.body;

    if (req.role == 21) {
      model
        .postTopup(number, step)
        .then((result) => {
          if (number && step) {
            res.status(200).send({
              success: true,
              message: "Success Create Topup!",
              data: req.body,
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Fields Must Be Field!",
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
};

module.exports = topupController;
