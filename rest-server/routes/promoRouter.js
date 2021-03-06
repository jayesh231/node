var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

var Router = express.Router();
Router.use(bodyParser.json());

Router.route('/')
.get(function (req, res, next) {
    Promotions.find({}, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.post(function (req, res, next) {
    Promotions.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);
    });
})

.delete(function (req, res, next) {
   Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

Router.route('/:promoId')
.get(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.put(function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.delete(function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = Router;
