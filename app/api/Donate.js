"use strict";

const server = require('../../server');
const crypto = require('crypto');

module.exports = {
    emitraResponse: (req, res) => {
        var mid = req.body.MERCHANTCODE;
        var prn = req.body.PRN;
        var rpptxid = req.body.RPPTXNID;
        var paymentAmount = req.body.PAYMENTAMOUNT;
        const key = '#2&[W<nJ*K"xO_z';
        var checksum = crypto.createHash('md5').update(`${mid}|${prn}|${rpptxid}|${paymentAmount}|${key}`).digest('hex');
        if (checksum == req.body.CHECKSUM) {
            var query = "INSERT INTO donations\
                (MERCHANTCODE, REQTIMESTAMP, PRN, AMOUNT, RPPTXNID, RPPTIMESTAMP, PAYMENTAMOUNT, STATUS,\
                PAYMENTMODE, PAYMENTMODEBID, PAYMENTMODETIMESTAMP, RESPONSECODE, RESPONSEMESSAGE, UDF1, UDF2, UDF3)\
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            server.pool.query(query, [
                req.body.MERCHANTCODE,
                req.body.REQTIMESTAMP,
                req.body.PRN,
                req.body.AMOUNT,
                req.body.RPPTXNID,
                req.body.RPPTIMESTAMP,
                req.body.PAYMENTAMOUNT,
                req.body.STATUS,
                req.body.PAYMENTMODE,
                req.body.PAYMENTMODEBID,
                req.body.PAYMENTMODETIMESTAMP,
                req.body.RESPONSECODE,
                req.body.RESPONSEMESSAGE,
                req.body.UDF1,
                req.body.UDF2,
                req.body.UDF3
            ], (err, result, feilds) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Transaction failed."
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Transaction completed.",
                        data: {
                            status: req.body.STATUS,
                            responseCode: req.body.RESPONSECODE,
                            responseMessage: req.body.RESPONSEMESSAGE
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Transaction failed."
            });
        }
    }
};
