export type CanispamClassification = 'fail' | 'pass' | 'warn';

export interface CanispamFinding {
  evidence?: string;
  message: string;
  rule: string;
  score: number;
}

export interface CanispamScoreBreakdown {
  classifier: number;
  content: number;
  html: number;
  links: number;
  subject: number;
}

export interface CanispamClassifierProbability {
  category: string;
  probability: number;
}

export interface CanispamClassifierResult {
  category: string;
  isSpam: boolean;
  probabilities: CanispamClassifierProbability[];
  tokenCount: number;
}

export interface CanispamScanResult {
  classification: CanispamClassification;
  classifier: CanispamClassifierResult;
  findings: CanispamFinding[];
  html: string;
  score: number;
  scoreBreakdown: CanispamScoreBreakdown;
  subject: string;
  text: string;
}

export interface ParsedEml {
  headers: Map<string, string>;
  html: string;
  subject: string;
  text: string;
}
