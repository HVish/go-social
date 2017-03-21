"use strict";

const server = require('../../server');
const input = require('../utils/Input');

module.exports = {
    create: (req, res) => {
        var valid = input.validate(req.body, {
            title: "isNotEmpty"
        });
        if (valid === true) {
            var query = "INSERT INTO campaigns(userId, title, details, image, video) values(?, ?, ?, ?, ?)";
            server.pool.query(query, [
                req.jwt.userId,
                req.body.title,
                req.body.details,
                req.body.image,
                req.body.video
            ], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unable to create campaign."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Campaign created!"
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Invalid input"
            });
        }
    },
    get: (req, res) => {
        var query = "SELECT * FROM campaigns WHERE createdAt=?";
        server.pool.query(query, [
            // TODO: get month starting datetime
        ], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: "Unable to create campaign."
                });
            } else {
                res.json({
                    success: true,
                    message: "Campaign created!"
                });
            }
        });
    }
};
