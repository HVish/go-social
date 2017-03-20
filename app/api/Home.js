"use strict";

module.exports = {

    index: (req, res) => {

        res.json({
            success: true,
            data: {
                message: "Welcome"
            }
        });

    }

};
