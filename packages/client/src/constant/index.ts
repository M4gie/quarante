import { Platform } from 'react-native';

type EnvVars = {
  serverUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    serverUrl:
      Platform.OS === 'web' ? 'http://localhost:4240/' : 'https://socket.quarante.m4gie.com/',
  },
  prod: {
    serverUrl: 'https://socket.quarante.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
