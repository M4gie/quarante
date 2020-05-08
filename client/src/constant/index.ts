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
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
