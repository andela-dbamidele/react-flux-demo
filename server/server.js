import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { createLogger } from 'logger';
import dotenv from 'dotenv';
import Firebase from 'firebase';
import messages from './routes/messages';

dotenv.config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

Firebase.initializeApp(config);

const app = express();
const port = process.env.PORT || 8000;
const logger = createLogger();
const publicPath = express.static(path.join(__dirname, '../client/assets'));

app.use('/', publicPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/messages', messages);

app.get('/*', (req, res) => {
  // res.send({
  //   status: 200
  // });
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  logger.info(`App is running on localhost:${port}`);
});
