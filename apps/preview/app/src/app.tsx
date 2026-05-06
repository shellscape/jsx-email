import { Canvas } from './components/canvas/canvas';
import { FileSystemPanel } from './components/file-system/file-system-panel';
import { Header } from './components/header';
import { LabControlsPanel } from './components/lab-controls/lab-controls-panel';
import { usePreviewStore } from './stores/preview-store';

export function App() {
  const cards = usePreviewStore((state) => state.cards);
  const selectedId = usePreviewStore((state) => state.selectedId);
  const templates = usePreviewStore((state) => state.templates);
  const selected = cards.find((card) => card.id === selectedId);
  const selectedTemplate = templates.find((template) => template.id === selected?.templateId);

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
