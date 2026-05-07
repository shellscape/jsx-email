import { beforeEach, describe, expect, it } from 'vitest';

import { addTemplateSlugs } from '../../src/helpers/template-routing';
import { gatherTemplates } from '../../src/helpers/templates';
import { usePreviewStore } from '../../src/stores/preview-store';

function resetPreviewStore() {
  usePreviewStore.setState({
    cards: [],
    focusRequest: null,
    labs: {},
    selectedId: null,
    templates: addTemplateSlugs(gatherTemplates())
  });
}

describe('preview store template routing', () => {
  beforeEach(() => {
    resetPreviewStore();
  });

  it('opens a template by slug', () => {
    const cardId = usePreviewStore.getState().addOrFocusTemplateBySlug('nike-receipt');
    const state = usePreviewStore.getState();

    expect(cardId).toEqual(expect.any(String));
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]?.templateId).toBe('emails/nike-receipt');
    expect(state.selectedId).toBe(cardId);
  });

  it('does nothing when a slug is missing', () => {
    const cardId = usePreviewStore.getState().addOrFocusTemplateBySlug('missing-template');
    const state = usePreviewStore.getState();

    expect(cardId).toBeNull();
    expect(state.cards).toEqual([]);
    expect(state.selectedId).toBeNull();
  });
});
