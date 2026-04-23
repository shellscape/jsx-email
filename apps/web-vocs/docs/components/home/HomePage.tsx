import { useEffect, useId, useMemo, useState } from 'react';

import styles from './HomePage.module.css';

type Author = {
  img: string;
  name: string;
  url: string;
};

type PullRequest = {
  number: number;
  title: string;
  url: string;
};

type PREntry = {
  author: Author;
  pr: PullRequest;
};

type TimelineEntry = {
  day: string;
  events: PREntry[];
};

type GitHubPR = {
  number: number;
  title: string;
  html_url: string;
  merged_at: string | null;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

type TrustedByItem = {
  href: string;
  src: string;
  label: string;
};

const TRUSTED_BY: TrustedByItem[] = [
  { href: 'https://sst.dev', src: 'sst-dev.svg', label: 'SST' },
  { href: 'https://rally.space', src: 'rally-space.svg', label: 'Rally Space' },
  { href: 'https://biblish.com/', src: 'biblish.svg', label: 'Biblish' },
  { href: 'https://estii.com/', src: 'estii.svg', label: 'Estii' },
  { href: 'https://helphero.co/', src: 'helphero.svg', label: 'HelpHero' },
  { href: 'https://www.konduktum.com/', src: 'konduktum.svg', label: 'Konduktum' },
  { href: 'https://requestmetrics.com', src: 'request-metrics.svg', label: 'Request Metrics' }
];

function formatStars(starsCount: number) {
  return new Intl.NumberFormat('en-US', {
    notation: starsCount >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(starsCount);
}

function buildTimeline(data: GitHubPR[]): TimelineEntry[] {
  const grouped = new Map<string, PREntry[]>();

  for (const pr of data) {
    if (!pr.merged_at) continue;

    const day = new Date(pr.merged_at).toISOString().split('T')[0];
    const list = grouped.get(day) ?? [];

    list.push({
      author: {
        img: pr.user.avatar_url,
        name: pr.user.login,
        url: pr.user.html_url
      },
      pr: {
        number: pr.number,
        title: pr.title,
        url: pr.html_url
      }
    });

    grouped.set(day, list);
  }

  return [...grouped.entries()]
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .map(([day, events]) => ({ day, events }));
}

function ExternalArrow() {
  return (
    <svg className={styles.externalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 126 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.199951 50V109V113H4.19995H121.8H125.8V109V50H117.8V105H8.19995V50H0.199951Z"
        fill="currentColor"
      />
      <path
        d="M0 53.429V47.4258L48.3069 22.8124V32.4176L11.2516 50.2773L11.5517 49.677V51.1778L11.2516 50.5775L48.3069 68.4372V78.0424L0 53.429Z"
        fill="currentColor"
      />
      <path d="M79.4367 0L54.6832 92H46.582L71.3356 0H79.4367Z" fill="currentColor" />
      <path
        d="M126 53.429L77.6931 78.0424V68.4372L114.748 50.5775L114.448 51.1778V49.677L114.748 50.2773L77.6931 32.4176V22.8124L126 47.4258V53.429Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
    </svg>
  );
}

function DiscordIcon({ clipId }: { clipId: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="71" height="55" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ThemeSunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.themeIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ThemeMoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.themeIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className={styles.announcementChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon} aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon} aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className={styles.mobileIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={styles.mobileIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ArrowRightLine() {
  return (
    <svg className={styles.inlineArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [stars, setStars] = useState<string | null>('...');
  const [copySuccess, setCopySuccess] = useState(false);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [timelineLoaded, setTimelineLoaded] = useState(false);

  const headerDiscordClipId = useId().replace(/:/g, '_');
  const footerDiscordClipId = useId().replace(/:/g, '_');

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/shellscape/jsx-email', {
          signal: controller.signal
        });

        if (!response.ok) {
          setStars(null);
          return;
        }

        const data = (await response.json()) as { stargazers_count?: number };
        if (typeof data.stargazers_count === 'number') {
          setStars(formatStars(data.stargazers_count));
        } else {
          setStars(null);
        }
      } catch {
        if (!controller.signal.aborted) {
          setStars(null);
        }
      }
    };

    void run();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/shellscape/jsx-email/pulls?state=closed&per_page=20',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json'
            },
            signal: controller.signal
          }
        );

        if (!response.ok) {
          setTimeline([]);
          setTimelineLoaded(true);
          return;
        }

        const releases = (await response.json()) as GitHubPR[];
        setTimeline(buildTimeline(releases));
        setTimelineLoaded(true);
      } catch {
        if (!controller.signal.aborted) {
          setTimeline([]);
          setTimelineLoaded(true);
        }
      }
    };

    void run();

    return () => {
      controller.abort();
    };
  }, []);

  const trustedByItems = useMemo(() => [...TRUSTED_BY, ...TRUSTED_BY], []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem('vocs.theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText('pnpm add jsx-email');
      setCopySuccess(true);

      window.setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch {
      setCopySuccess(false);
    }
  };

  return (
    <div className={styles.homeRoot}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a href="/" className={styles.logoLink}>
              <LogoMark />
              <span className={styles.logoText}>jsx.email</span>
            </a>

            <nav className={styles.desktopNav}>
              <a href="/getting-started/introduction" className={styles.navLink}>
                Documentation
              </a>
              <a href="/components/background" className={styles.navLink}>
                Components
              </a>
              <a href="/blocks" className={styles.navLink}>
                Blocks
              </a>
              <a href="http://samples.jsx.email" target="_blank" rel="noreferrer" className={styles.navLink}>
                Samples
                <ExternalArrow />
              </a>
              <a href="https://pro.jsx.email" target="_blank" rel="noreferrer" className={styles.navLink}>
                Pro Templates
                <ExternalArrow />
              </a>
            </nav>

            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.themeToggle}
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
              >
                {isDark ? <ThemeSunIcon /> : <ThemeMoonIcon />}
              </button>

              <div className={styles.socialLinks}>
                <a
                  href="https://discord.gg/FywZN57mTg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Discord"
                >
                  <DiscordIcon clipId={headerDiscordClipId} />
                </a>
                <a
                  href="https://github.com/shellscape/jsx-email"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                  {stars && <span className={styles.starCount}>{stars}</span>}
                </a>
              </div>

              <button
                type="button"
                className={styles.mobileToggle}
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <span className={styles.srOnly}>Open main menu</span>
                {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>

        <div id="mobile-menu" className={mobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            <a href="/introduction" className={styles.mobileMenuLink}>
              Documentation
            </a>
            <a href="/components" className={styles.mobileMenuLink}>
              Components
            </a>
            <a href="/blocks" className={styles.mobileMenuLink}>
              Blocks
            </a>
            <a href="http://samples.jsx.email" target="_blank" rel="noreferrer" className={styles.mobileMenuLink}>
              Samples
              <ExternalArrow />
            </a>
            <a href="/pro-templates" className={styles.mobileMenuLink}>
              Pro Templates
              <ExternalArrow />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.announcementRow}>
              <ShareIcon />
              <div className={styles.announcementPill}>
                <span>jsx-email is a community fork of react-email, see what's new</span>
                <ChevronRightIcon />
              </div>
            </div>

            <h1 className={styles.heroTitle}>Building Emails doesn't have to be Painful.</h1>

            <p className={styles.heroSubtitle}>
              Develop standards compliant emails with JSX or TSX with amazing developer experience.
              Compatible with the most popular email clients.
            </p>

            <div className={styles.heroActions}>
              <a href="/getting-started/quick-start" className={styles.primaryButton}>
                Quick Start
              </a>
              <button type="button" className={styles.secondaryButton} onClick={copyInstallCommand}>
                pnpm add jsx-email
                {copySuccess ? <SuccessIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageFrame}>
              <div className={styles.heroImageMobile}>
                <div className={styles.heroImageMobileCrop}>
                  <img src="/assets/hero.svg" alt="JSX Email component illustration" className={styles.heroImageMobileAsset} />
                </div>
              </div>
              <div className={styles.heroImageDesktop}>
                <img src="/assets/hero.svg" alt="JSX Email component illustration" className={styles.heroImageDesktopAsset} />
              </div>
            </div>
          </div>

          <div className={styles.workflowContainer}>
            <div className={styles.workflowPills}>
              <span className={styles.workflowLabel}>Workflows:</span>
              <button type="button" className={styles.workflowActive}>
                Backend Integration
              </button>
              <button type="button" className={styles.workflowInactive}>
                Standalone Builder
              </button>
            </div>
          </div>
        </section>

        <section className={styles.sponsorsSection}>
          <div className={styles.containerCustom}>
            <div className={styles.marqueeMask}>
              <div className={styles.marqueeTrack}>
                {trustedByItems.map((item, index) => (
                  <a
                    key={`${item.src}-${index}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.trustedByItem}
                    aria-label={item.label}
                  >
                    <img src={`/assets/trusted-by/${item.src}`} className={styles.trustedByImage} alt={item.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.containerCustom}>
            <div className={styles.topFeatureCard}>
              <div className={styles.topFeatureGrid}>
                <div>
                  <h2 className={styles.featureTitleLarge}>
                    Compatibility is complicated,
                    <br />
                    jsx-email makes it simple.
                  </h2>
                  <p className={styles.featureBody}>
                    Emails make heavy use of {'<table>'} based layouts for compatibility, jsx-email
                    has you covered with over 20 custom components you can use directly in your email
                    templates.
                  </p>
                  <a href="/components" className={styles.featureLink}>
                    Components
                  </a>
                </div>
                <div className={styles.topFeatureImageWrap}>
                  <img
                    src="/assets/compatibility-is-complicated.svg"
                    alt="HTML Email Components Layers"
                    className={styles.topFeatureImage}
                  />
                </div>
              </div>
            </div>

            <div className={styles.featureColumns}>
              <div className={styles.featureColumn}>
                <div className={styles.featureCardTall}>
                  <h3 className={styles.featureTitle}>Style with your tools.</h3>
                  <p className={styles.featureBody}>Style your components your way using CSS-in-JS or TailwindCSS / UnoCSS.</p>
                  <a href="/styling-guide" className={styles.featureLink}>
                    Styling Guide
                  </a>
                  <div className={styles.featureImageWrapIndented}>
                    <img src="/assets/style-with-your-tools.svg" alt="Styling Tools" className={styles.featureImage} />
                  </div>
                </div>

                <div className={styles.featureCardShort}>
                  <h3 className={styles.featureTitle}>Check compatibility.</h3>
                  <p className={styles.featureBody}>Test the compatibility of your CSS with a single command.</p>
                  <a href="/cli-check" className={styles.featureLink}>
                    CLI: Check
                  </a>

                  <div className={styles.commandPill}>
                    <span className={styles.commandPrompt}>$</span>
                    <span className={styles.commandText}>
                      pnpm <span className={styles.commandHighlight}>email check ./templates</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.featureColumn}>
                <div className={styles.featureCardTallOverflow}>
                  <h3 className={styles.featureTitle}>Preview while Building.</h3>
                  <p className={styles.featureBody}>Preview your templates as you're building them.</p>
                  <a href="/cli-preview" className={styles.featureLink}>
                    CLI: Preview
                  </a>

                  <div className={styles.previewShell}>
                    <div className={styles.previewSkeleton}>
                      <div className={styles.previewBlockHeader}>
                        <div className={styles.previewLineWide} />
                        <div className={styles.previewLineShort} />
                      </div>
                      <div>
                        <div className={styles.previewLineForm} />
                        <div className={styles.previewLineBody} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.featureCardShort}>
                  <h3 className={styles.featureTitle}>Use anywhere.</h3>
                  <p className={styles.featureBody}>
                    Use jsx-email as your email templating solution for Nuxt, Next, Astro, Express,
                    Koa, and even with backends & services that don't use JS/TS.
                  </p>
                  <div className={styles.featureLinkGroup}>
                    <a href="/backend-integration-guide" className={styles.featureLink}>
                      Backend Integration Guide
                    </a>
                    <a href="/workflows-guide" className={styles.featureLink}>
                      Workflows Guide
                    </a>
                  </div>

                  <div className={styles.featureImageWrapIndented}>
                    <img src="/assets/use-anywhere.svg" alt="Integration Illustration" className={styles.featureImage} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.featuresBottomLinkWrap}>
              <a href="/docs" className={styles.featuresBottomLink}>
                Find out more in the docs
                <ArrowRightLine />
              </a>
            </div>
          </div>
        </section>

        <section className={styles.changelogSection}>
          <div className={styles.containerCustom + ' ' + styles.changelogContainer}>
            <div className={styles.timelineLine} />

            <div className={styles.changelogHeaderCard}>
              <h2 className={styles.changelogTitle}>Changelog</h2>
              <p className={styles.changelogSubtitle}>Explore the latest contributions to jsx-email</p>

              <a
                href="https://github.com/shellscape/jsx-email/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged"
                target="_blank"
                rel="noreferrer"
                className={styles.changelogPrimaryButton}
              >
                View on Github
              </a>
            </div>

            <div className={styles.timelineEntries}>
              {timeline.length > 0 ? (
                timeline.map(({ day, events }, index) => {
                  const rightSide = index % 2 === 0;

                  return (
                    <div
                      key={day}
                      className={`${styles.timelineEntry} ${rightSide ? styles.timelineEntryRight : styles.timelineEntryLeft}`}
                    >
                      <div className={`${styles.timelinePoint} ${rightSide ? styles.timelinePointRight : styles.timelinePointLeft}`} />

                      <div className={`${styles.timelineContent} ${rightSide ? styles.timelineContentRight : styles.timelineContentLeft}`}>
                        <p className={styles.timelineDate}>
                          {new Date(day).toLocaleString('en-us', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>

                        {events.map((entry) => (
                          <div className={styles.timelineEvent} key={entry.pr.url}>
                            <a href={entry.author.url} target="_blank" rel="noreferrer" className={styles.authorPill}>
                              <img src={entry.author.img} alt={entry.author.name} className={styles.authorAvatar} />
                              {entry.author.name}
                            </a>
                            <div className={styles.prLine}>
                              #{entry.pr.number}:{' '}
                              <a href={entry.pr.url} target="_blank" rel="noreferrer" className={styles.prLink}>
                                {entry.pr.title}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : timelineLoaded ? (
                <div className={styles.timelineFallback}>
                  <p>
                    Couldn't load recent contributions. Please visit our GitHub repository to see the
                    latest updates.
                  </p>
                </div>
              ) : (
                <div className={styles.timelineFallback}>
                  <p>Loading changelog…</p>
                </div>
              )}
            </div>

            <div className={styles.changelogBottomButtonWrap}>
              <a
                href="https://github.com/shellscape/jsx-email/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged"
                target="_blank"
                rel="noreferrer"
                className={styles.changelogBottomButton}
              >
                <span>View all on Github</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeftGroup}>
              <div className={styles.footerLogoWrap}>
                <a href="/" className={styles.logoLink}>
                  <LogoMark />
                  <span className={styles.logoText}>jsx.email</span>
                </a>
              </div>

              <div className={styles.footerDivider} />
              <div className={styles.footerCopyrightDesktop}>© 2024 jsx.email.</div>
            </div>

            <div className={styles.footerNavGroup}>
              <a href="/components/background" className={styles.footerNavLink}>
                Components
              </a>
              <a href="/blocks" className={styles.footerNavLink}>
                Blocks
              </a>
              <a href="http://samples.jsx.email" target="_blank" rel="noreferrer" className={styles.footerNavLink}>
                Samples
                <ExternalArrow />
              </a>
              <a href="https://pro.jsx.email" target="_blank" rel="noreferrer" className={styles.footerNavLink}>
                Pro Templates
                <ExternalArrow />
              </a>
              <a
                href="https://github.com/shellscape/jsx-email"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://discord.gg/FywZN57mTg"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="Discord"
              >
                <DiscordIcon clipId={footerDiscordClipId} />
              </a>
            </div>
          </div>

          <div className={styles.footerCopyrightMobile}>© 2024 jsx.email.</div>
        </div>
      </footer>
    </div>
  );
}
