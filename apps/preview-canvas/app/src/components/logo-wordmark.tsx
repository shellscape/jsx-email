import logoWordmarkSource from '../../../../web/src/ui/components/LogoWordmark.astro?raw';

const logoMarkup = logoWordmarkSource
  .slice(0, logoWordmarkSource.indexOf('<style>'))
  .replace('class="logo-wordmark"', 'class="logo-wordmark"');

export function LogoWordmark() {
  return <span className="block w-full" dangerouslySetInnerHTML={{ __html: logoMarkup }} />;
}
