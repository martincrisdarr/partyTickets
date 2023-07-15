import cors from 'cors';
import express, { Application } from 'express';
import fileupload from 'express-fileupload';
import http from 'http';
import morgan from 'morgan';
import os from 'os';
import logger from './logger';
import path from 'path';

const app = express();

export default class ExpressServer {
  private routes!: (app: Application) => void;
  constructor() {
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || '20MB' }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '8MB',
      })
    );
    app.use(
      fileupload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
      })
    );
    app.use(express.static('public'));
    app.use(express.text({ limit: process.env.REQUEST_LIMIT || '20MB' }));
    app.use(function (req, res, next) {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.header('Pragma', 'no-cache');
      res.header('Expires', '0');
      next();
    });
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void => {
      logger.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );
    };
    const server = http.createServer(app);
    this.routes(app);
    app.get('(/*)?', async (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
    server.listen(port, welcome(port));
    return app;
  }
}
