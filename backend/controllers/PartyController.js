'use strict';

const Party = require('../models/Party');
const User = require('../models/User');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
  
const partyCtrl = {
    createParty: (req, res) => {
        const creator = req.body.id;
        const body = {...Object.fromEntries(Object.entries(req.body).
          filter(([key, val]) => key != 'id')), remainingPeople: 1};
        if(!body.name || body.attendance < 1) {
          throw new Error("Name or attendance fields are invalid");
        }
        if (!creator){
          throw new Error("Session expired");
        }
        Party.create(body)
          .then((result) => {
              User.updateOne(
                { '_id': ObjectId(creator)}, 
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
            .sort( { remainingPeopple : 1, attendance: 1, name : 1  } )
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
          .sort( {  remainingPeopple: 1, attendance: 1, name : 1 } )
          .then((result2) => {
              res.send(result2)})
              .catch((e) => res.status(500).send(e))
        })
        .catch((e) => res.status(500).send(e));
    },

    joinParty: (req, res) => {
      const body = req.body;
      if(!body.party_id || !body.user_id) {
        throw new Error("Join party failed")
      }
      Party.find(
        { '_id': ObjectId(body.party_id) },
      ).then((result) => { 
        if(result[0].remainingPeople >= result[0].attendance) {
          throw new Error("Join party failed")
        } 
      })
      Party.updateOne(
        { '_id': ObjectId(body.party_id) },
        { $inc: { 'remainingPeople' : 1 } }
     ).then((result) => {
        User.updateOne(
                { '_id': ObjectId(body.user_id)}, 
                { $push: { 'parties': body.party_id } }
             ).then((result2) => {
               res.send(result2)})
               .catch((e) => res.status(500).send(e))
     })
     .catch((e) => res.status(500).send(e));
  },

  disjoinParty: (req, res) => {
    const body = req.body;
    if(!body.party_id || !body.user_id) {
      throw new Error("Disjoin party failed")
    }
    Party.find(
      { '_id': ObjectId(body.party_id) },
    ).then((result) => { 
      if(result[0].remainingPeople < 1) {
        throw new Error("Disjoin party failed")
      } 
      })
    Party.updateOne(
      { '_id': ObjectId(body.party_id) },
      { $inc: { 'remainingPeople' : -1 }  }
   ).then((result) => {
      User.updateOne(
              { '_id': ObjectId(body.user_id)}, 
              { $pull: { 'parties': body.party_id } }
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
