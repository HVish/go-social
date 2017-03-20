module.exports = {
    port: process.env.PORT || 3000,
    sessionSecret: "====SECRET====",
    mysql: {
        debug: false,
        connectionLimit: 10,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    },
    jwt: {
        secret: "====SECRET====",
        expiresInMinutes: 1440    // expires in 24 hours
    }
};
