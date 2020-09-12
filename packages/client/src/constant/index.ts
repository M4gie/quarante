type EnvVars = {
  serverUrl: string;
  apiUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    serverUrl: 'http://192.168.1.97:4240/',
    apiUrl: 'http://192.168.1.97:3333/',
  },
  prod: {
    serverUrl: 'https://socket.quarante.m4gie.com/',
    apiUrl: 'https://api.quarante.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
