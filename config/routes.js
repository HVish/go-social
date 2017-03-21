/*******************************************************************************
 * Routes.js
 *******************************************************************************
 *
 * The controllers are in the directory:
 * 1. /app/api/
 * 2. /app/web/
 *
 * There are two type of routing:
 * 1. For API
 * 2. For Website
 *
 * The endpoint you mention will be as follows:
 *
 * "METHOD URL" : "Controller_Name.Function_Name"
 *
 * here METHOD will be: {"GET", "POST", "PUT", "DELETE"}
 * and so on as mentioned in express.js documentation for routing methods.
 *
 * The URL will automatically be prepended by the type of routing. For example:
 * api: {
 *     "GET /home/books": "Home.index"
 * }
 * above will be converted to url: /api/home/books
 ******************************************************************************/

"use strict";

module.exports = {
    api: {
        // all api routes
        "GET /": "Home.index",
        "POST /user": "User.create",
        "POST /login": "User.login",
        "PUT /user": "User.update",
        "DELETE /user": "User.del",
        "POST /campaign": "Campaign.create",
        "GET /campaign": "Campaign.get",
        "POST /upvote": "Vote.create",
        "GET /votes": "Vote.get"
    },
    web: {
        // all website routes
        "GET /": "Home.index"
    }
};
