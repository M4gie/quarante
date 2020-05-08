type EnvVars = {
  serverUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    serverUrl: 'http://localhost:4240/',
  },
  prod: {
    serverUrl: 'https://socket.quarante.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
