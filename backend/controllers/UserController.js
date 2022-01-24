'use strict';

const User = require('../models/User');
  
const userCtrl = {
    register: (req, res) => {
        const body = {...req.body, parties: []};
        if(!body.titleName || !body.firstName || !body.lastName || !body.email || !body.password ){
          throw new Error("Every field is required")
        }
        User.create(body)
          .then((result) => res.send(result))
          .catch((e) => res.error(e));
    },
    login: (req, res) => {
        const body = {...req.body, parties: []};
        if(!body.email || !body.password){
          throw new Error("Every field is required")
        }
        const body = req.body;
        User.find(body)
          .then((result) => {
            if(result.length == 0) {
              throw new Error('Invalid email or password please try again');
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
