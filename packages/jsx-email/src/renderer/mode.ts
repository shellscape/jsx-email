import { createContext } from './compat/context.js';

export type RenderMode = 'default' | 'render';

export const RenderModeContext = createContext<RenderMode>('default');
