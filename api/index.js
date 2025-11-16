import { createRequestHandler } from '@vercel/remix';
import * as build from '../build/server/index.js';

export const config = {
  runtime: 'nodejs18.x',
};

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
