import { extractLinks, extractUrls } from './html.js';
import { getIdnRisk } from './idn.js';
import type { CanispamFinding } from './types.js';

const shorteners = /\b(bit\.ly|tinyurl\.com|goo\.gl|t\.co|ow\.ly|is\.gd|buff\.ly|j\.mp)\b/i;
const suspiciousTlds = new Set(['tk', 'ml', 'ga', 'cf', 'gq', 'xyz', 'top', 'click', 'download']);

const parseUrl = (value: string) => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

export const scanLinks = (text: string, html: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];

  for (const url of extractUrls(html, text)) {
    const parsed = parseUrl(url);
    if (parsed) {
      const hostname = parsed.hostname.toLowerCase();
      const tld = hostname.split('.').pop() || '';

      if (shorteners.test(hostname))
        findings.push({
          evidence: url,
          message: 'URL shortener detected.',
          rule: 'url-shortener',
          score: 2
        });
      if (/^(?:\d+\.){3}\d+$/.test(hostname))
        findings.push({
          evidence: url,
          message: 'URL uses an IP address hostname.',
          rule: 'ip-url',
          score: 2
        });
      if (suspiciousTlds.has(tld))
        findings.push({
          evidence: url,
          message: `Suspicious TLD detected: ${tld}.`,
          rule: 'suspicious-tld',
          score: 2
        });
      if (url.length > 200)
        findings.push({
          evidence: url.slice(0, 120),
          message: 'Very long URL detected.',
          rule: 'long-url',
          score: 1
        });

      const idnRisk = getIdnRisk(hostname);
      if (idnRisk > 0)
        findings.push({
          evidence: hostname,
          message: 'IDN or homograph domain risk detected.',
          rule: 'idn-homograph',
          score: idnRisk
        });
    }
  }

  for (const link of extractLinks(html)) {
    const href = parseUrl(link.href);
    const label = parseUrl(link.text);
    if (href && label && href.hostname.toLowerCase() !== label.hostname.toLowerCase()) {
      findings.push({
        evidence: `${link.text} -> ${link.href}`,
        message: 'Link text URL does not match href URL.',
        rule: 'link-mismatch',
        score: 3
      });
    }
  }

  return findings;
};
