const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.JS');

const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

module.exports = purchaseRouter;