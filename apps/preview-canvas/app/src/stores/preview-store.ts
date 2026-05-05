import { create } from 'zustand';

import type { CardState, LabState } from '../types/lab';
import type { TemplateData } from '../types/templates';
import { previewPresets } from '../helpers/presets';
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
  templates: TemplateData[];
  zoom: number;
  addOrFocusTemplate: (templateId: string) => string;
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
  templates: gatherTemplates(),
  zoom: 100,
  addOrFocusTemplate(templateId) {
    const existing = get().cards.find((card) => card.templateId === templateId);
    if (existing) {
      set((state) => ({
        focusRequest: { id: existing.id, sequence: (state.focusRequest?.sequence || 0) + 1 },
        selectedId: existing.id
      }));
      return existing.id;
    }

    const id = `${templateId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    set((state) => ({
      cards: [...state.cards, { id, templateId }],
      focusRequest: { id, sequence: (state.focusRequest?.sequence || 0) + 1 },
      labs: { ...state.labs, [id]: defaultLabState() },
      selectedId: id
    }));
    return id;
  },
  closeCard(cardId) {
    set((state) => {
      const labs = { ...state.labs };
      delete labs[cardId];
      const cards = state.cards.filter((card) => card.id !== cardId);
      const selectedId = state.selectedId === cardId ? cards.at(-1)?.id || null : state.selectedId;
      return {
        cards,
        focusRequest:
          selectedId && state.selectedId === cardId
            ? { id: selectedId, sequence: (state.focusRequest?.sequence || 0) + 1 }
            : state.focusRequest,
        labs,
        selectedId
      };
    });
  },
  ensureLab(cardId) {
    set((state) =>
      state.labs[cardId]
        ? state
        : { labs: { ...state.labs, [cardId]: defaultLabState() } }
    );
  },
  focusCard(cardId) {
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
    set({ templates });
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
