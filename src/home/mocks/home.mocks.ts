const APP_NAME = 'TestExampleName';
const APP_VERSION = '0.0.1';

export const appInfo = {
  name: APP_NAME,
  version: APP_VERSION,
};

const configValues = {
  'app.name': APP_NAME,
  'app.version': APP_VERSION,
};

export const configServiceMock = {
  get: jest.fn((key: string) => {
    return configValues[key];
  }),
};

export const homeServiceMock = {
  appInfo: jest.fn(() => appInfo),
};
