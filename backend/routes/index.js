'use strict';

const express = require('express');

const routes = express.Router();
const { userCtrl } = require('../controllers/UserController');
const { partyCtrl } = require('../controllers/PartyController');

routes.route('/users/register').post(userCtrl.register)

routes.route('/users').post(userCtrl.login)

routes.route('/parties').post(partyCtrl.createParty)

routes.route('/parties/:id').get(partyCtrl.getAllParty)

routes.route('/parties/my-parties/:id').get(partyCtrl.getMyParty)

routes.route('/parties/join').post(partyCtrl.joinParty)

routes.route('/parties/disjoin').post(partyCtrl.disjoinParty)

module.exports = routes;