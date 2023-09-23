require('./setup');

const logger = require('./common/logger');
const Server = require('./common/server');
const routes = require('./routes');
const Settings = require('./settings');

const port = parseInt(Settings.applicationPort);
logger.info(`Starting server at port ${port}..`);

export default new Server().router(routes).listen(port);
