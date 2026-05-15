import { describe, expect, it } from 'vitest';

import { createSerialAsyncQueue } from '../../src/cli/serial-queue.js';

describe('serial queue', () => {
  it('runs tasks sequentially in enqueue order', async () => {
    const queue = createSerialAsyncQueue();
    const events: string[] = [];

    const schedule = (name: string, delay: number) =>
      queue(async () => {
        events.push(`${name}:start`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        events.push(`${name}:end`);

        return name;
      });

    const first = schedule('first', 30);
    const second = schedule('second', 5);
    const third = schedule('third', 1);

    await expect(Promise.all([first, second, third])).resolves.toEqual([
      'first',
      'second',
      'third'
    ]);
    expect(events).toEqual([
      'first:start',
      'first:end',
      'second:start',
      'second:end',
      'third:start',
      'third:end'
    ]);
  });

  it('continues processing tasks after a rejection', async () => {
    const queue = createSerialAsyncQueue();
    const events: string[] = [];

    const failed = queue(async () => {
      events.push('failed:start');
      throw new Error('boom');
    });

    const succeeded = queue(async () => {
      events.push('succeeded:start');
      events.push('succeeded:end');

      return 'ok';
    });

    await expect(failed).rejects.toThrow('boom');
    await expect(succeeded).resolves.toBe('ok');
    expect(events).toEqual(['failed:start', 'succeeded:start', 'succeeded:end']);
  });
});
