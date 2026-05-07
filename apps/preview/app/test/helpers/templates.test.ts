import { describe, expect, it } from 'vitest';

import {
  addTemplateSlugs,
  getHashRouteSlug,
  getTemplateSlug
} from '../../src/helpers/template-routing';
import { gatherTemplates } from '../../src/helpers/templates';

describe('gatherTemplates', () => {
  it('rewrites preview static image URLs to public demo asset URLs', () => {
    const airbnb = gatherTemplates().find((template) => template.templateName === 'Airbnb Review');

    expect(airbnb?.html).toContain('https://jsx.email/assets/demo/airbnb-logo.png');
    expect(airbnb?.html).toContain('https://jsx.email/assets/demo/batman-twilight.jpg');
    expect(airbnb?.html).not.toContain('/static/');
    expect(airbnb?.source).not.toContain('/static/');
  });

  it('can derive unique canonical slugs from gathered template file names', () => {
    const templates = addTemplateSlugs(gatherTemplates());
    const slugs = templates.map((template) => template.slug);

    expect(templates.find((template) => template.templateName === 'Nike Receipt')?.slug).toBe(
      'nike-receipt'
    );
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('template routing', () => {
  it('derives canonical slugs from template file names', () => {
    expect(getTemplateSlug('nike-receipt')).toBe('nike-receipt');
    expect(getTemplateSlug('welcome emails/stripe-welcome')).toBe('welcome-emails-stripe-welcome');
    expect(getTemplateSlug('Credential Emails/Magic Links/Notion_Magic Link')).toBe(
      'credential-emails-magic-links-notion-magic-link'
    );
  });

  it('parses hash route slugs', () => {
    expect(getHashRouteSlug('#/nike-receipt')).toBe('nike-receipt');
    expect(getHashRouteSlug('#/welcome-emails-stripe-welcome?tab=preview')).toBe(
      'welcome-emails-stripe-welcome'
    );
    expect(getHashRouteSlug('#/%E0%A4%A')).toBeNull();
    expect(getHashRouteSlug('')).toBeNull();
  });
});
