import cors from 'cors';
import http from 'http';

import Database from './config/database.js';
import express from 'express';
import routes from './routes/routes.js';

class App {
  constructor() {
    this.port = '3001';
    this.app = express();
    this.httpServer = http.createServer(this.app);

    this.database = new Database();
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log(`Servidor iniciado na porta ${this.port}`)
      this.app.use(cors());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json());

      this.app.use(routes);

      this.database.setup();
    });

    process.on('SIGINT', this.gracefulStop());
  }

  gracefulStop() {
    return () => {
      this.httpServer.close(async error => {
        await this.database.disconnect();

        return error ? process.exit(1) : process.exit(0);
      });
    };
  }
};

export default App;
