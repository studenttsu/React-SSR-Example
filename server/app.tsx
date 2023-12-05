import path from "path";
import express from 'express';
import compression from 'compression';

import renderMiddleware from "./middlewares/render";

const app = express();

app
    .use(compression())
    .use('/', express.static(path.join(__dirname, 'public')))
    .get('/*', renderMiddleware);

export default app;