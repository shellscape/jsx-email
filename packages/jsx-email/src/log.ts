import { getLog } from '@dot/log';
import chalk from 'chalk-template';

export const getPluginLog = (name: string) =>
  getLog({ brand: 'jsx-email', name: chalk`{bold ∵ ${name}}` } as any);

export const log = getLog({ brand: 'jsx-email' } as any);
