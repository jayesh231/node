/* favorite module*/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json())
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({'postedBy':req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    req.body.postedBy = req.decoded._doc._id;
    //req.body.dishes.push(req.body.id);
    Favorites.find({'postedBy':req.decoded._doc._id},function(err,favorite){
      if(err) throw err;
      if(!favorite.length)
      {
        Favorites.create(req.body, function (err, favorite) {
            if (err) throw err;
            var id = favorite._id;
            Favorites.findById(id, function (err, favoriteUp) {
              if (err) throw err;
              favoriteUp.dishes.push(req.body.id);
              favoriteUp.save(function (err, favoriteRes) {
                  if (err) throw err;
                  res.json(favoriteRes);
              });
            });
        });
      }
      else
      {
        Favorites.findById(favorite[0]._id, function (err, favoriteUp) {
              if (err) throw err;
              var dishExists = false;
              if (favoriteUp.dishes.length) {
                for (var i = 0; i < favoriteUp.dishes.length; i++) {
                  if (favoriteUp.dishes[i] == req.body.id) {
                    dishExists = true;
                    break;
                  }
                }
              }
              if(!dishExists)
              {
                favoriteUp.dishes.push(req.body.id);
                favoriteUp.save(function (err, favoriteRes) {
                    if (err) throw err;
                    res.json(favoriteRes);
                });
              }
              else
              {
                console.log('Dish is already added to favorites');
                res.json(favoriteUp);
              }
        });
      }
    });
})
    
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    // Delete all favorites belongs to loggedin user
    Favorites.remove({'postedBy':req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
      // Delete specific dish object id belongs to loggedin user
      var dishId = req.params.dishId;
      Favorites.find({'postedBy':req.decoded._doc._id},function(err,favorite,req){
        if(err) throw err;
        Favorites.findById(favorite[0]._id, function (err, favoriteUp) {
              if (err) throw err;
              favoriteUp.dishes.remove(dishId);
              favoriteUp.save(function (err, favoriteRes) {
                  if (err) throw err;
                  res.json(favoriteRes);
              });
        });
    });
});


module.exports = favoriteRouter;