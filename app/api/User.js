"use strict";

const server = require('../../server');
const input = require('../utils/Input');
const crypto = require('crypto');

module.exports = {
    create: (req, res) => {
        var valid = input.validate(req.body, {
            name: "isNotEmpty",
            email: "isEmail",
            password: "isNotEmpty"
        });

        if (valid === true) {
            req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
            var query = "INSERT INTO users(name, email, password) values(?, ?, ?)";
            server.pool.query(query, [
                req.body.name,
                req.body.email,
                req.body.password
            ], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unable to create user."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "User created!"
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
    login: (req, res) => {
        const jwt = require('jsonwebtoken');
        var valid = input.validate(req.body, {
            email: "isEmail",
            password: "isNotEmpty"
        });

        if (valid === true) {
            req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
            var query = "SELECT * FROM users WHERE email=? AND password=?";
            server.pool.query(query, [
                req.body.email,
                req.body.password
            ], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unable to login user."
                    });
                } else if (!result.length) {
                    res.json({
                        success: false,
                        message: "Wrong credentials."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "login successful!",
                        token: jwt.sign({
                            userId: result[0].userId,
                            name: result[0].name,
                            email: result[0].email
                        }, server.locals.jwt.secret)
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
    update: (req, res) => {

    },
    del: (req, res) => {

    }
};
