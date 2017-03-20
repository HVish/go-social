"use strict";

const server = require('../../server');

module.exports = {
    index: (req, res, next) => {
        server.pool.query("SELECT * FROM users WHERE email=?", [
            req.body.email
        ], (err, result, feilds) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: "Unable to create user."
                });
            } else if (result.length) {
                res.json({
                    success: false,
                    message: "User already exists."
                });
            } else {
                next();
            }
        });
    }
};
