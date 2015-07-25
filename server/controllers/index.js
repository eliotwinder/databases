var models = require('../models');
var bluebird = require('bluebird');
var urlParse = require('url').parse;
var db = require('../db');
var utils = require('../utils');


module.exports = {
  messages: {
    get: function (req, res) {
      db.getMessagesBB()
      .then(function(rows, fields){
        console.log(rows);
        utils.sendResponse(res, rows, 200);
      })
      .catch(function(error) {
        res.end(error);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) { 
      console.log("message post req body: ", req.body);
      db.getUserIdFromNameBB(req.body.username)
      .then(function(userId) {
        console.log('message type',req.body.message, typeof req.body.message);
        db.addMessageBB(userId, req.body.message, req.body.roomname);
      })
      .then(function() {
        res.end();
      })
      .catch(function(err) {
        // send error message
        console.log('error posting message', err);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var path = urlParse(req.url);
      var username = req.body.username;
      db.addUserBB(username)
      .then(function() {
        res.end();
      })
      .catch(function(err){
        console.log( ':|', err);
        res.end('some kind of error'); 
      });
        
    }
  }
};

