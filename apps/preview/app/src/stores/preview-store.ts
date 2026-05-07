import { create } from 'zustand';

import type { CardState, LabState } from '../types/lab';
import type { TemplateData } from '../types/templates';
import { previewPresets } from '../helpers/presets';
import {
  addTemplateSlugs,
  clearTemplateHash,
  updateTemplateHash,
  type RoutedTemplateData
} from '../helpers/template-routing';
import { gatherTemplates } from '../helpers/templates';

const defaultLabState = (): LabState => ({
  colorScheme: false,
  invertColors: false,
  preset: previewPresets[0].name,
  sendEmail: '',
  sendError: null,
  sendState: 'idle'
});

interface PreviewStore {
  cards: CardState[];
  focusRequest: { id: string; sequence: number } | null;
  labs: Record<string, LabState>;
  panelCollapsed: boolean;
  selectedId: string | null;
  templates: RoutedTemplateData[];
  zoom: number;
  addOrFocusTemplate: (templateId: string) => string;
  addOrFocusTemplateBySlug: (slug: string) => string | null;
  closeCard: (cardId: string) => void;
  ensureLab: (cardId: string) => void;
  focusCard: (cardId: string | null) => void;
  setPanelCollapsed: (value: boolean) => void;
  setTemplates: (templates: TemplateData[]) => void;
  setZoom: (value: number) => void;
  updateLab: (cardId: string, patch: Partial<LabState>) => void;
}

export const usePreviewStore = create<PreviewStore>((set, get) => ({
  cards: [],
  focusRequest: null,
  labs: {},
  panelCollapsed: true,
  selectedId: null,
  templates: addTemplateSlugs(gatherTemplates()),
  zoom: 100,
  addOrFocusTemplate(templateId) {
    const template = get().templates.find((item) => item.id === templateId);
    const existing = get().cards.find((card) => card.templateId === templateId);
    if (existing) {
      if (template) updateTemplateHash(template.slug);
      set((state) => ({
        focusRequest: { id: existing.id, sequence: (state.focusRequest?.sequence || 0) + 1 },
        selectedId: existing.id
      }));
      return existing.id;
    }

    const id = `${templateId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    if (template) updateTemplateHash(template.slug);
    set((state) => ({
      cards: [...state.cards, { id, templateId }],
      focusRequest: { id, sequence: (state.focusRequest?.sequence || 0) + 1 },
      labs: { ...state.labs, [id]: defaultLabState() },
      selectedId: id
    }));
    return id;
  },
  addOrFocusTemplateBySlug(slug) {
    const template = get().templates.find((item) => item.slug === slug);
    return template ? get().addOrFocusTemplate(template.id) : null;
  },
  closeCard(cardId) {
    const state = get();
    const labs = { ...state.labs };
    delete labs[cardId];
    const cards = state.cards.filter((card) => card.id !== cardId);
    const selectedId = state.selectedId === cardId ? cards.at(-1)?.id || null : state.selectedId;
    const selectedTemplate = state.templates.find(
      (template) => template.id === cards.find((card) => card.id === selectedId)?.templateId
    );

    if (selectedTemplate) updateTemplateHash(selectedTemplate.slug);
    else if (!selectedId) clearTemplateHash();

    set({
      cards,
      focusRequest:
        selectedId && state.selectedId === cardId
          ? { id: selectedId, sequence: (state.focusRequest?.sequence || 0) + 1 }
          : state.focusRequest,
      labs,
      selectedId
    });
  },
  ensureLab(cardId) {
    set((state) =>
      state.labs[cardId] ? state : { labs: { ...state.labs, [cardId]: defaultLabState() } }
    );
  },
  focusCard(cardId) {
    const template = get().templates.find(
      (item) => item.id === get().cards.find((card) => card.id === cardId)?.templateId
    );
    if (template) updateTemplateHash(template.slug);
    set((state) => ({
      focusRequest: cardId
        ? { id: cardId, sequence: (state.focusRequest?.sequence || 0) + 1 }
        : state.focusRequest,
      selectedId: cardId
    }));
  },
  setPanelCollapsed(value) {
    set({ panelCollapsed: value });
  },
  setTemplates(templates) {
    set({ templates: addTemplateSlugs(templates) });
  },
  setZoom(value) {
    set({ zoom: value });
  },
  updateLab(cardId, patch) {
    set((state) => {
      const previous = state.labs[cardId] || defaultLabState();
      return { labs: { ...state.labs, [cardId]: { ...previous, ...patch } } };
    });
  }
}));

export function getLab(cardId: string | null) {
  if (!cardId) return defaultLabState();
  return usePreviewStore.getState().labs[cardId] || defaultLabState();
}
