import { useEffect } from 'react';

import { Canvas } from './components/canvas/canvas';
import { FileSystemPanel } from './components/file-system/file-system-panel';
import { Header } from './components/header';
import { LabControlsPanel } from './components/lab-controls/lab-controls-panel';
import { getHashRouteSlug } from './helpers/template-routing';
import { usePreviewStore } from './stores/preview-store';

export function App() {
  const cards = usePreviewStore((state) => state.cards);
  const selectedId = usePreviewStore((state) => state.selectedId);
  const templates = usePreviewStore((state) => state.templates);
  const addOrFocusTemplateBySlug = usePreviewStore((state) => state.addOrFocusTemplateBySlug);
  const selected = cards.find((card) => card.id === selectedId);
  const selectedTemplate = templates.find((template) => template.id === selected?.templateId);

  useEffect(() => {
    function openHashRoute() {
      const slug = getHashRouteSlug();
      if (slug) addOrFocusTemplateBySlug(slug);
    }

    openHashRoute();
    window.addEventListener('hashchange', openHashRoute);

    return () => window.removeEventListener('hashchange', openHashRoute);
  }, [addOrFocusTemplateBySlug]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <FileSystemPanel />
      {selected && selectedTemplate && (
        <LabControlsPanel cardId={selected.id} template={selectedTemplate} />
      )}
      <Canvas />
    </div>
  );
}
