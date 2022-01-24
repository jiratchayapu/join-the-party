'use strict';

const User = require('../models/User');
  
const userCtrl = {
    register: (req, res) => {
        const body = {...req.body, parties: []};
        if(!body.titleName || !body.firstName || !body.lastName || !body.email || !body.password ){
          throw new Error("Every field is required")
        }
        User.find( { 'email': body.email })
          .then((result) => {
            if(result.length > 0) {
              res.status(400).json({message:"This email is already used please try again"})
            }
          })
          .catch((e) => {
              res.status(500).send(e)
            });
        User.create(body)
          .then((result) => res.send(result))
          .catch((e) => res.status(500).send(e));
    },
    login: (req, res) => {
        const body = req.body;
        if(!body.email || !body.password){
          res.status(400).json({message:"Every field is required"})
        }
        User.find(body)
          .then((result) => {
            if(result.length == 0) {
              res.status(400).json({message: "Invalid email or password please try again"})
            }
            else {
              res.send(result);
            }
          })
          .catch((e) => {
              res.status(500).send(e)
            });
    },
};

module.exports = {
    userCtrl,
};
