import Constants from 'expo-constants';

type EnvVars = {
  serverUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    serverUrl: 'ws://localhost:4240/',
  },
  prod: {
    serverUrl: 'wss://socket.quarante.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  const env = Constants.manifest.releaseChannel;
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('prod') !== -1) return ENV.prod;
  return ENV.dev;
}
