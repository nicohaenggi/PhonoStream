module.exports = {
    env: "production",
    express: {
        port: 3000,
        ip: "10.135.18.48"
    },
    mongo: {
        url : "mongodb://127.0.0.1/" + "phonostream"
    },
    temp : {
        dir: "/tmp/"
    }
}