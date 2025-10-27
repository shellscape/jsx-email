import { getLog } from '@dot/log';
import chalk from 'chalk';
export const getPluginLog = (name) => getLog({ brand: 'jsx-email', name: chalk `{bold ∵ ${name}}` });
export const log = getLog({ brand: 'jsx-email' });
//# sourceMappingURL=log.js.map