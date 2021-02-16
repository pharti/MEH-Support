// src/config/index.js

import env from 'react-native-config';

const config = {
  api: {
    host: env.BASE_URL,
    environment: env.ENV,
    timeout: 20000,
  },
};

const BASE_URL = config.api.host;
const ENVIRONMENT = config.api.environment;
export {BASE_URL, ENVIRONMENT};

export default config;
