require('./setup');

import logger from './common/logger';
import Server from './common/server';
import routes from './routes';
import Settings from './settings';

const port = parseInt(Settings.applicationPort);
logger.info(`Starting server at port ${port}..`);

export default new Server().router(routes).listen(port);
