"use strict";

const server = require('../../server');

module.exports = {
    index: (req, res, next) => {
        var d = new Date();
        server.pool.query("SELECT * FROM votes WHERE userId=? AND month=?", [
            req.jwt.userId,
            d.getMonth() + '/' + d.getFullYear()
        ], (err, result, feilds) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: "Unable to upvote campaign."
                });
            } else if (result.length) {
                res.json({
                    success: false,
                    message: "You already upvoted!"
                });
            } else {
                next();
            }
        });
    }
};
