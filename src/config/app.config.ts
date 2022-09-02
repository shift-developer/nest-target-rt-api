import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  version: process.env.npm_package_version,
  workingDirectory: process.env.PWD || process.cwd(),
  port: parseInt(process.env.PORT || process.env.APP_PORT, 10),
  apiPrefix: process.env.API_PREFIX,
}));
