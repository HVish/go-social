"use strict";

const server = require('../../server');
const input = require('../utils/Input');

module.exports = {
    create: (req, res) => {
        var valid = input.validate(req.body, {
            campaignId: "isNotEmpty"
        });
        var d = new Date();
        if (valid === true) {
            var query = "INSERT INTO votes(userId, month, campaignId) values(?, ?, ?)";
            server.pool.query(query, [
                req.jwt.userId,
                d.getMonth() + '/' + d.getFullYear(),
                req.body.campaignId
            ], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unable to upvote campaign."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Campaign upvoted!"
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
        var valid = input.validate(req.query, {
            campaignId: "isNotEmpty"
        });
        if (valid === true) {
            var query = "SELECT COUNT(voteId) AS vote FROM votes WHERE campaignId=?";
            server.pool.query(query, [
                req.query.campaignId
            ], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unable to get votes of campaign."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Found result.",
                        data: {
                            votes: result[0].vote
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Invalid input"
            });
        }
    }
};
