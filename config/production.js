module.exports = {
    env: "production",
    express: {
        port: 3000,
        ip: "46.101.109.42"
    },
    mongo: {
        url : "mongodb://127.0.0.1/" + "phonostream"
    },
    temp : {
        dir: "/tmp/"
    }
}