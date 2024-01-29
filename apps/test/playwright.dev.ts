/* eslint-disable import/no-default-export */
import config from './playwright.config';

(config.webServer as any).command = 'moon app-test:dev';

export default Object.assign(config, {});
