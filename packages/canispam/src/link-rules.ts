import { extractLinks, extractUrls } from './html.js';
import { getIdnRisk } from './idn.js';
import type { CanispamFinding } from './types.js';

const shorteners = new Set([
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  't.co',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'j.mp'
]);
const suspiciousTlds = new Set(['tk', 'ml', 'ga', 'cf', 'gq', 'xyz', 'top', 'click', 'download']);
const redirectParams = new Set([
  'next',
  'redirect',
  'redirect_uri',
  'return',
  'return_to',
  'target',
  'url'
]);

const parseUrl = (value: string) => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

const isIpv4Hostname = (hostname: string) => {
  const parts = hostname.split('.');
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    if (!part) return false;
    const value = Number(part);
    return Number.isInteger(value) && value >= 0 && value <= 255 && String(value) === part;
  });
};

const getNestedRedirectHostname = (url: URL) => {
  for (const [key, value] of url.searchParams) {
    if (redirectParams.has(key.toLowerCase())) {
      const nested = parseUrl(value);
      if (nested && nested.hostname.toLowerCase() !== url.hostname.toLowerCase()) {
        return nested.hostname.toLowerCase();
      }
    }
  }

  return '';
};

export const scanLinks = (text: string, html: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];

  for (const url of extractUrls(html, text)) {
    const parsed = parseUrl(url);
    if (parsed) {
      const hostname = parsed.hostname.toLowerCase();
      const tld = hostname.split('.').pop() || '';

      if (shorteners.has(hostname))
        findings.push({
          evidence: url,
          message: 'URL shortener detected.',
          rule: 'url-shortener',
          score: 2
        });
      if (isIpv4Hostname(hostname))
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
      const nestedRedirectHostname = getNestedRedirectHostname(parsed);
      if (nestedRedirectHostname)
        findings.push({
          evidence: `${hostname} -> ${nestedRedirectHostname}`,
          message: 'URL contains a redirect parameter to another host.',
          rule: 'redirect-url-param',
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
