'use strict';

const Party = require('../models/Party');
const User = require('../models/User');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
  
const partyCtrl = {
    createParty: (req, res) => {
        const body = {...Object.fromEntries(Object.entries(req.body).
        filter(([key, val]) => key != 'id')), remainingPeople: 1};
        Party.create(body)
          .then((result) => {
              User.updateOne(
                { '_id': ObjectId(req.body.id)}, 
                { $push: { 'parties': result._id } }
             ).then((result2) => {
               res.send(result2)})
               .catch((e) => res.status(500).send(e))
            })
          .catch((e) => res.status(500).send(e));
    },
    getAllParty: (req, res) => {
        User.find(
          { '_id': ObjectId(req.params.id)}, {'parties':1, '_id':0}
          ).then((result) => {
            Party.find( { '_id': { $nin: result[0].parties }, $where: function() { return this.attendance > this.remainingPeople } } )
            .then((result2) => {
                res.send(result2)})
                .catch((e) => res.status(500).send(e))
          })
          .catch((e) => res.status(500).send(e));
    },
    getMyParty: (req, res) => {
      User.find(
        { '_id': ObjectId(req.params.id)}, {'parties':1, '_id':0}
        ).then((result) => {
          Party.find( { '_id': { $in: result[0].parties }} )
          .then((result2) => {
              res.send(result2)})
              .catch((e) => res.status(500).send(e))
        })
        .catch((e) => res.status(500).send(e));
    },
    joinParty: (req, res) => {
      console.log(req.body)
      Party.updateOne(
        { '_id': ObjectId(req.body.party_id) },
        {
          $inc: { 'remainingPeople' : 1 }
        }
     ).then((result) => {
        User.updateOne(
                { '_id': ObjectId(req.body.user_id)}, 
                { $push: { 'parties': req.body.party_id } }
             ).then((result2) => {
               res.send(result2)})
               .catch((e) => res.status(500).send(e))
     })
     .catch((e) => res.status(500).send(e));
  },
  disjoinParty: (req, res) => {
    console.log(req.body)
    Party.updateOne(
      { '_id': ObjectId(req.body.party_id) },
      {
        $inc: { 'remainingPeople' : -1 }
      }
   ).then((result) => {
      User.updateOne(
              { '_id': ObjectId(req.body.user_id)}, 
              { $pull: { 'parties': req.body.party_id } }
           ).then((result2) => {
             res.send(result2)})
             .catch((e) => res.status(500).send(e))
   })
   .catch((e) => res.status(500).send(e));
},
};

module.exports = {
    partyCtrl,
};
