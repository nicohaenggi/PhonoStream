module.exports = {
    env: "production",
    express: {
        port: process.env.OPENSHIFT_NODEJS_PORT,
        ip: process.env.OPENSHIFT_NODEJS_IP
    },
    mongo: {
        url : process.env.OPENSHIFT_MONGODB_DB_URL + "nodejs"
    },
    temp : {
        dir: process.env.OPENSHIFT_DATA_DIR
    }
}