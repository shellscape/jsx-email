import { Check, Prohibition, WarningTriangle } from 'iconoir-react';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import tippy from 'tippy.js';

import type { CanispamFinding } from 'canispam';

import type { SpamAnalysisState } from '../../helpers/spam-analysis';
import { cn } from '../../helpers/cn';
import { previewTippyProps } from '../../helpers/tippy';

interface SpamPopoverProps {
  state?: SpamAnalysisState;
  style?: CSSProperties;
}

const ruleLabels: Record<string, { description: string; title: string }> = {
  'base64-image': {
    description: 'An embedded base64 image can increase filtering risk.',
    title: 'Embedded image data'
  },
  gtube: {
    description: 'A standard spam-test pattern was found.',
    title: 'Spam test pattern'
  },
  'hidden-text': {
    description: 'Hidden or tiny text was found in the email markup.',
    title: 'Hidden text detected'
  },
  'image-heavy': {
    description: 'The email has many images compared with visible text.',
    title: 'Image-heavy layout'
  },
  'ip-url': {
    description: 'A link uses an IP address instead of a domain name.',
    title: 'IP address link'
  },
  'link-mismatch': {
    description: 'The visible link text points to a different destination.',
    title: 'Link destination mismatch'
  },
  'long-url': {
    description: 'A very long link was found in the email.',
    title: 'Long link detected'
  },
  'missing-plain-text': {
    description: 'The email does not include a plain text version.',
    title: 'Missing plain text'
  },
  'naive-bayes': {
    description: 'The classifier matched language commonly seen in spam.',
    title: 'Spam-like language'
  },
  'redirect-url-param': {
    description: 'A link redirects through a parameter to another host.',
    title: 'Redirecting link'
  },
  'spam-keyword': {
    description: 'Spam-like words or phrases were found in the template.',
    title: 'Spam keywords found'
  },
  'spam-phrase': {
    description: 'A spam-like phrase pattern was matched.',
    title: 'Spam phrase matched'
  },
  'subject-all-caps': {
    description: 'The subject line uses mostly uppercase letters.',
    title: 'Loud subject line'
  },
  'subject-punctuation': {
    description: 'The subject line uses repeated punctuation.',
    title: 'Heavy punctuation'
  },
  'subject-urgency': {
    description: 'The subject line uses urgency or account-action language.',
    title: 'Urgent subject'
  },
  'suspicious-tld': {
    description: 'A link uses a domain ending often seen in risky email.',
    title: 'Suspicious domain ending'
  },
  'url-shortener': {
    description: 'A shortened URL hides the final destination.',
    title: 'Shortened link'
  }
};

const getVerdict = (state?: SpamAnalysisState) => {
  if (!state || state.status === 'idle') return 'Pending';
  if (state.status === 'scanning') return 'Analyzing';
  if (state.status === 'error') return 'Unavailable';
  if (state.status === 'pass') return 'Not Spam';
  if (state.status === 'warn') return 'A Bit Spammy';

  return 'Likely Filtered';
};

const getSummary = (state: SpamAnalysisState | undefined, signalCount: number) => {
  if (!state || state.status === 'idle') return 'Spam analysis has not started yet.';
  if (state.status === 'scanning') return 'Spam analysis is running for this template.';
  if (state.status === 'error') return state.message || 'Spam analysis could not be completed.';
  if (state.status === 'pass') return 'No meaningful spam signals were found in this template.';
  if (state.status === 'warn') {
    return (
      <>
        This template contains <CountBadge count={signalCount} size="normal" /> spam-like{' '}
        {signalCount === 1 ? 'signal' : 'signals'}.
      </>
    );
  }

  return (
    <>
      This template contains <CountBadge count={signalCount} size="normal" /> strong spam-like{' '}
      {signalCount === 1 ? 'signal' : 'signals'}.
    </>
  );
};

const getSeverity = (state?: SpamAnalysisState) => {
  if (state?.status === 'fail') return 'red';
  if (state?.status === 'warn') return 'yellow';

  return 'green';
};

interface FindingGroup {
  count: number;
  evidences: string[];
  rule: string;
  score: number;
}

const groupFindings = (findings: CanispamFinding[]): FindingGroup[] => {
  const groups = new Map<string, FindingGroup>();

  for (const finding of findings) {
    const group = groups.get(finding.rule) || {
      count: 0,
      evidences: [],
      rule: finding.rule,
      score: 0
    };

    group.count += 1;
    group.score += finding.score;

    const evidence = finding.evidence?.trim();
    if (evidence && !group.evidences.includes(evidence)) group.evidences.push(evidence);

    groups.set(finding.rule, group);
  }

  return Array.from(groups.values()).sort((a, b) => b.score - a.score || b.count - a.count);
};

const getGroupTitle = (group: FindingGroup) => {
  if (group.rule === 'spam-keyword') return `Spam keyword${group.count === 1 ? '' : 's'} found`;

  return getFindingCopy(group.rule).title;
};

const getGroupDescription = (group: FindingGroup) => {
  if (group.rule === 'spam-keyword') {
    return `${group.count} spam-like ${group.count === 1 ? 'keyword was' : 'keywords were'} found in the content.`;
  }

  return getFindingCopy(group.rule).description;
};

const getFindingCopy = (rule: string) =>
  ruleLabels[rule] || {
    description: 'A canispam rule found a possible delivery risk.',
    title: 'Spam signal found'
  };

const getGroupSeverity = (score: number) => {
  if (score >= 4) return 'red';
  if (score > 0) return 'yellow';

  return 'green';
};

const isLinkEvidence = (rule: string) =>
  rule.includes('url') ||
  rule.includes('link') ||
  rule.includes('tld') ||
  rule.includes('idn') ||
  rule.includes('domain');

export function SpamPopover({ state, style }: SpamPopoverProps) {
  const severity = getSeverity(state);
  const findings = state?.findings || [];
  const findingGroups = groupFindings(findings);

  return (
    <div
      className={cn('spam-popover', `is-${severity}`)}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      role="dialog"
      style={style}
    >
      <div className="spam-popover-header">
        <div className="spam-popover-heading">
          <div className="spam-popover-title">{getVerdict(state)}</div>
          <div className="spam-popover-subtitle">{getSummary(state, findings.length)}</div>
        </div>
      </div>
      <div className="spam-popover-body">
        <div className="spam-popover-findings">
          {findingGroups.slice(0, 5).map((group) => (
            <FindingGroupCard group={group} key={group.rule} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FindingGroupCard({ group }: { group: FindingGroup }) {
  const description = getGroupDescription(group);

  return (
    <div className="spam-popover-finding">
      <FindingIcon severity={getGroupSeverity(group.score)} />
      <div className="spam-popover-finding-text">
        <TippyTitle content={description}>
          {getGroupTitle(group)}
          {group.count > 1 && <CountBadge count={group.count} />}
        </TippyTitle>
        {group.evidences.length > 0 && (
          <EvidenceCloud
            evidences={group.evidences}
            linkStyle={isLinkEvidence(group.rule)}
            toggleLabel={group.rule === 'hidden-text' ? 'text' : 'matches'}
          />
        )}
      </div>
    </div>
  );
}

function EvidenceCloud({
  evidences,
  linkStyle,
  toggleLabel
}: {
  evidences: string[];
  linkStyle: boolean;
  toggleLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="spam-popover-evidence">
      <button
        aria-expanded={expanded}
        className="spam-popover-evidence-toggle"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        {expanded ? `Hide ${toggleLabel}` : `Show ${toggleLabel}`}
      </button>
      {expanded && (
        <div className={cn('spam-popover-evidence-list', linkStyle && 'is-links')}>
          {evidences.map((evidence) => (
            <span key={evidence}>{evidence}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function TippyTitle({ children, content }: { children: ReactNode; content: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const instance = tippy(element, {
      ...previewTippyProps,
      content
    });

    return () => {
      instance.destroy();
    };
  }, [content]);

  return (
    <strong className="spam-popover-finding-title" ref={ref}>
      {children}
    </strong>
  );
}

function CountBadge({ count, size = 'small' }: { count: number; size?: 'normal' | 'small' }) {
  return <span className={cn('spam-popover-count', `is-${size}`)}>{count}</span>;
}

function FindingIcon({ severity }: { severity: 'green' | 'red' | 'yellow' }) {
  if (severity === 'green') return <Check className="spam-popover-finding-icon is-green" />;
  if (severity === 'red') return <Prohibition className="spam-popover-finding-icon is-red" />;

  return <WarningTriangle className="spam-popover-finding-icon is-yellow" />;
}
