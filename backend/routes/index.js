'use strict';

const express = require('express');

const routes = express.Router();
const { userCtrl } = require('../controllers/UserController');
const { partyCtrl } = require('../controllers/PartyController');

//routes.route('/').get(ctrl.getAllTask)

routes.route('/users/register').post(userCtrl.register)

routes.route('/users').post(userCtrl.login)

routes.route('/parties').post(partyCtrl.createParty)

routes.route('/parties/:id').get(partyCtrl.getAllParty)

routes.route('/parties/my-parties/:id').get(partyCtrl.getMyParty)

routes.route('/parties/join').post(partyCtrl.joinParty)

routes.route('/parties/disjoin').post(partyCtrl.disjoinParty)



/*routes.route('/get').get(ctrl.getAllTask)

routes.route('/edit/:id').get(ctrl.getTask)

routes.route('/put/:id').put(ctrl.updateTask)

routes.route('/delete/:id').delete(ctrl.deleteTask)*/

module.exports = routes;