var express = require('express');
var mongoose = require('mongoose');
var webToken = require('jsonwebtoken');

var authRouter = require('express').Router;

var User = require('../schemas/user');


authRouter.post('/authenticate', function(req, res) {
    User.findOne({ email: req.body.email },
        function(err, user) {
            if(err) throw err;
            if(!user) {
                res.json({ success: false, message: 'Authentication failed.  User not found.' });
            } else if(user) {
                if(user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed.  Incorrect password.' });                    
                } else {
                    var token = webToken.sign(user, app.get('tokenSecret'), { expiresInMinutes: 1440 });

                    res.json({
                        success: true,
                        message: 'Authenticated',
                        token: token
                    });
                }
            }
        });
});