import {
  scan,
  type CanispamClassification,
  type CanispamClassifierResult,
  type CanispamFinding,
  type CanispamScoreBreakdown
} from 'canispam';
import { toEml } from 'jsx-email/eml';

import type { TemplateData } from '../types/templates';

export type SpamAnalysisStatus = 'error' | 'fail' | 'idle' | 'pass' | 'scanning' | 'warn';

export interface SpamAnalysisState {
  classification?: CanispamClassification;
  classifier?: CanispamClassifierResult;
  findings?: CanispamFinding[];
  message?: string;
  score?: number;
  scoreBreakdown?: CanispamScoreBreakdown;
  status: SpamAnalysisStatus;
}

export type SpamLabelVariant = 'green' | 'grey' | 'red' | 'yellow';

export const getTemplateSpamKey = (
  template: Pick<TemplateData, 'html' | 'plain' | 'templateName'>
) => `${template.templateName}\n${template.html}\n${template.plain}`;

export const getSpamLabelVariant = (state?: SpamAnalysisState): SpamLabelVariant => {
  if (state?.status === 'fail') return 'red';
  if (state?.status === 'warn') return 'yellow';
  if (state?.status === 'pass') return 'green';

  return 'grey';
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
      classifier: result.classifier,
      findings: result.findings,
      score: result.score,
      scoreBreakdown: result.scoreBreakdown,
      status: result.classification
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Spam analysis failed',
      status: 'error'
    };
  }
};
