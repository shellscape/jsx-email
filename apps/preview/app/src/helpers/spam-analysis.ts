import { scan, type CanispamClassification } from 'canispam';
import { toEml } from 'jsx-email/eml';

import type { TemplateData } from '../types/templates';

export type SpamAnalysisStatus = 'error' | 'fail' | 'idle' | 'pass' | 'scanning' | 'warn';

export interface SpamAnalysisState {
  classification?: CanispamClassification;
  message?: string;
  score?: number;
  status: SpamAnalysisStatus;
}

export type SpamLabelVariant = 'green' | 'red' | 'yellow';

export const getTemplateSpamKey = (
  template: Pick<TemplateData, 'html' | 'plain' | 'templateName'>
) => `${template.templateName}\n${template.html}\n${template.plain}`;

export const getSpamLabelVariant = (state?: SpamAnalysisState): SpamLabelVariant => {
  if (state?.status === 'fail') return 'red';
  if (state?.status === 'pass') return 'green';

  return 'yellow';
};

export const getSpamLabelTitle = (state?: SpamAnalysisState) => {
  if (!state || state.status === 'idle') return 'Spam analysis pending';
  if (state.status === 'scanning') return 'Spam analysis running';
  if (state.status === 'error') return state.message || 'Spam analysis failed';

  return `Spam ${state.classification || state.status}; score ${state.score ?? 0}`;
};

export const analyzeTemplateSpam = async (
  template: Pick<TemplateData, 'html' | 'plain' | 'templateName'>
): Promise<SpamAnalysisState> => {
  try {
    const eml = toEml({
      html: template.html,
      plain: template.plain,
      subject: template.templateName
    });
    const result = await scan(eml);

    return {
      classification: result.classification,
      score: result.score,
      status: result.classification
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Spam analysis failed',
      status: 'error'
    };
  }
};
