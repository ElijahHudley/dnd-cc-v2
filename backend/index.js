const configs = require("./configs");
const database = require('./database');
const server = require("./server");

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});

const dbConfig = configs.getDatabaseConfig();
const db = database.init(dbConfig);

const conf = {
     server: configs.getServerConfig(),
     auth: configs.getAuthConfig()  
}

const appServer = server.init(conf, db);

appServer.listen(process.env.PORT || conf.server.port, () => {
    console.log('Server running at:', conf.server.port);
    
});
