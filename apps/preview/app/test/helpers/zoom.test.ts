import { describe, expect, it } from 'vitest';

import { nextZoom } from '../../src/helpers/zoom';

describe('nextZoom', () => {
  it('keeps 100 percent reachable after zooming out to the minimum', () => {
    let zoom = 100;
    for (let index = 0; index < 12; index += 1) zoom = nextZoom(zoom, -1);

    expect(zoom).toBe(25);

    const steps = Array.from({ length: 8 }, () => {
      zoom = nextZoom(zoom, 1);
      return zoom;
    });

    expect(steps).toEqual([30, 40, 50, 60, 70, 80, 90, 100]);
  });
});
