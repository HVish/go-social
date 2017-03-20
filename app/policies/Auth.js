"use strict";

const jwt = require('jsonwebtoken');
const locals = require('../../config/locals.js');

module.exports = {

    index: (req, res, next) => {

        var token = req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies['x-access-token'];

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, locals.jwt.secret, function(err, jwtDecoded) {
                if (err) {
                    return res.json({
                        success: false,
                        data: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.jwt = jwtDecoded;
                    next();
                }
            });

        } else {

            return res.json({
                success: false,
                data: 'No token provided.'
            });

        }

    }

};
