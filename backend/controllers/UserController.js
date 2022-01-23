'use strict';

const User = require('../models/User');
//const jwt = require('jsonwebtoken');
  
const userCtrl = {
    register: (req, res) => {
        const body = {...req.body, parties: []};
        User.create(body)
          .then((result) => res.send(result))
          .catch((e) => res.error(e));
    },
    login: (req, res) => {
        const body = req.body;
        User.find(body)
          .then((result) => {
            if(result.length == 0) throw new Error('Invalid email or password please try again');
            else res.send(result);})
          .catch((e) => {
              console.log('Invalid email or password please try again'); 
              res.status(500).send(e)
            });
    },
  /*getTask: (req, res) => {
    Task.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((e) => res.error(e));
  },

  getAllTask: (req, res) => {
    Task.find()
      .then((result) => res.send(result))
      .catch((e) => res.error(e));
  },

  

  updateTask: (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    Task.findByIdAndUpdate(id, {
      $set: payload
    })
    .then((result) => res.send(result))
    .catch((e) => res.error(e));
  },


  deleteTask: (req, res, next) => {
    Task.findByIdAndRemove(req.params.id)
    .then((result) => res.send(result))
    .catch((e) => res.error(e));
  },
*/
};

module.exports = {
    userCtrl,
};
