import { HalfMoon, NavArrowLeft, NavArrowRight, Send, SmartphoneDevice } from 'iconoir-react';
import { useEffect } from 'react';
import tippy from 'tippy.js';

import { cn } from '../../helpers/cn';
import { previewPresets } from '../../helpers/presets';
import { usePreviewStore } from '../../stores/preview-store';
import type { TemplateData } from '../../types/templates';
import { Button } from '../ui/button';
import { SendEmailSection } from './send-email-section';
import { SwitchControl } from './switch-control';

interface LabControlsPanelProps {
  cardId: string;
  template: TemplateData;
}

export function LabControlsPanel({ cardId, template }: LabControlsPanelProps) {
  const lab = usePreviewStore((state) => state.labs[cardId]);
  const panelCollapsed = usePreviewStore((state) => state.panelCollapsed);
  const setPanelCollapsed = usePreviewStore((state) => state.setPanelCollapsed);
  const updateLab = usePreviewStore((state) => state.updateLab);

  useEffect(() => {
    if (panelCollapsed) return;
    const instances = tippy('#tool-panel [data-tippy-content]', {
      delay: [250, 0],
      offset: [0, 8],
      placement: 'bottom',
      theme: 'preview-canvas'
    });
    return () => instances.forEach((instance) => instance.destroy());
  }, [cardId, panelCollapsed]);

  if (!lab) return null;

  return (
    <aside
      aria-label={panelCollapsed ? 'Expand tool panel' : undefined}
      className={cn(
        'app-panel fixed bottom-24 right-3 top-24 z-40 overflow-hidden transition-[width] duration-150 ease-out',
        panelCollapsed ? 'w-12 cursor-pointer' : 'w-80'
      )}
      id="tool-panel"
      onClick={panelCollapsed ? () => setPanelCollapsed(false) : undefined}
      onKeyDown={
        panelCollapsed
          ? (event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              event.preventDefault();
              setPanelCollapsed(false);
            }
          : undefined
      }
      role={panelCollapsed ? 'button' : undefined}
      tabIndex={panelCollapsed ? 0 : undefined}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            'flex border-b border-[var(--border)] px-3 py-2',
            panelCollapsed ? 'items-center justify-center' : 'items-center justify-between'
          )}
        >
          {!panelCollapsed && (
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-strong)]">
              Lab Controls
            </div>
          )}
          {panelCollapsed ? (
            <span
              aria-hidden="true"
              className="inline-flex min-h-0 items-center justify-center px-1.5 py-1"
            >
              <NavArrowLeft className="size-4" />
            </span>
          ) : (
            <Button
              aria-label="Collapse tool panel"
              className="panel-collapse-button min-h-0 px-1.5 py-1"
              onClick={() => setPanelCollapsed(true)}
              size="sm"
              title="Collapse tool panel"
              variant="ghost"
            >
              <NavArrowRight className="size-[13px]" />
            </Button>
          )}
        </div>
        {panelCollapsed ? (
          <CollapsedIcons />
        ) : (
          <ExpandedPanel cardId={cardId} template={template} />
        )}
      </div>
    </aside>
  );

  function ExpandedPanel({ cardId, template }: LabControlsPanelProps) {
    return (
      <div className="min-h-0 w-80 flex-1 overflow-auto">
        <section className="tool-section">
          <div className="tool-title">
            <HalfMoon className="size-[18px]" />
            Color Mode
          </div>
          <SwitchControl
            checked={lab.colorScheme}
            label="Dark Mode color scheme"
            onChange={(value) =>
              updateLab(cardId, {
                colorScheme: value,
                invertColors: value ? false : lab.invertColors
              })
            }
            tooltip="Apple Mail supports dark/light schemes"
          />
          <SwitchControl
            checked={lab.invertColors}
            label="Gmail Color Inversion"
            onChange={(value) =>
              updateLab(cardId, {
                colorScheme: value ? false : lab.colorScheme,
                invertColors: value
              })
            }
            tooltip="Gmail inverts colors for dark mode"
          />
        </section>
        <section className="tool-section">
          <div className="tool-title">
            <SmartphoneDevice className="size-[18px]" />
            Presets
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {previewPresets.map((preset) => (
              <button
                aria-pressed={lab.preset === preset.name}
                className={cn(
                  'preset-pill cursor-pointer',
                  lab.preset === preset.name && 'is-active'
                )}
                key={preset.name}
                onClick={() => updateLab(cardId, { preset: preset.name })}
                type="button"
              >
                <span>{preset.name}</span>
                <small>{preset.label}</small>
              </button>
            ))}
          </div>
        </section>
        <section className="tool-section">
          <div className="tool-title">
            <Send className="size-[18px]" />
            Send Email
          </div>
          <SendEmailSection cardId={cardId} html={template.html} />
        </section>
      </div>
    );
  }
}

function CollapsedIcons() {
  return (
    <div className="tool-collapsed-icons min-h-0 flex-1 overflow-hidden">
      {[
        ['Color mode', HalfMoon, 'is-color'],
        ['Presets', SmartphoneDevice, 'is-presets'],
        ['Send email', Send, 'is-send']
      ].map(([label, Icon, className]) => (
        <section className={cn('tool-collapsed-section', className)} key={label as string}>
          <span
            aria-label={label as string}
            className="tool-collapsed-icon"
            title={label as string}
          >
            <Icon className="size-[17px]" />
          </span>
        </section>
      ))}
    </div>
  );
}
