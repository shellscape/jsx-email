import { describe, expect, it } from 'vitest';

import { gatherTemplates } from '../../src/helpers/templates';

describe('gatherTemplates', () => {
  it('rewrites preview static image URLs to public demo asset URLs', () => {
    const airbnb = gatherTemplates().find((template) => template.templateName === 'Airbnb Review');

    expect(airbnb?.html).toContain('https://jsx.email/assets/demo/airbnb-logo.png');
    expect(airbnb?.html).toContain('https://jsx.email/assets/demo/batman-twilight.jpg');
    expect(airbnb?.html).not.toContain('/static/');
    expect(airbnb?.source).not.toContain('/static/');
  });
});
