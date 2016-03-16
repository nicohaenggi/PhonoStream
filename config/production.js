module.exports = {
    env: "production",
    express: {
        port: 3000,
        ip: "46.101.109.42"
    },
    mongo: {
        url : process.env.OPENSHIFT_MONGODB_DB_URL + "phonostream"
    },
    temp : {
        dir: process.env.OPENSHIFT_DATA_DIR
    }
}