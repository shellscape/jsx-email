import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('/var/folders/07/ywbfgwc57_z4yx4m8vzhr8580000gp/T/jsx-email/preview');
const target = resolve('apps/preview-canvas/dev/fixtures');

await rm(target, { force: true, recursive: true });
await cp(source, target, { recursive: true });

console.log(`Copied preview fixtures from ${source} to ${target}`);
