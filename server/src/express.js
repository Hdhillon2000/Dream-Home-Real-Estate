
import 'dotenv/config';
import { join } from 'path';
import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';

import serverListener from './listener.js';
import ApiRouteMaster from './api.route.master.js';

const app = express();
app
  .use(cors(
    {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  ))
  .use(compress())
  .use(cookieParser())
  .use(express.json({ limit: '10mb' }))
  .use(express.urlencoded({ limit: '10mb', extended: true }))
  .use(helmet())

  .use(express.static(join(process.cwd(), 'client/dist')))

  .get(/^(?!\/api).*/, (_, res) => {
    res.sendFile(join(join(process.cwd(), 'client/dist'), 'index.html'));
  });

ApiRouteMaster(app);

await serverListener(app);
