const dbconfigs = require(`./database.${process.env.NODE_ENV || "dev"}`);
const serverconfigs = require(`./server.${process.env.NODE_ENV || "dev"}`);

module.exports.getDatabaseConfig = function () {
    return dbconfigs.database;
}

module.exports.getServerConfig = function () {
    return serverconfigs.server;
}