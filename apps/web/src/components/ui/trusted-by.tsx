import Marquee from './Marquee';
import { FadeBlock } from './fade-block';

type TrustedByItemProps = {
  href: string;
  src: string;
};
const TrustedByItem = ({ href, src }: TrustedByItemProps) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-block mx-10 md:mx-20">
      <img src={`/assets/trusted-by/${src}`} className="w-auto h-16" />
    </a>
  );
};

export const TrustedBy = () => {
  return (
    <FadeBlock className="faq" visibilityAmount={0.4}>
      <Marquee autoFill pauseOnHover>
        <TrustedByItem href="https://sst.dev" src="sst-dev.svg" />
        <TrustedByItem href="https://rally.space" src="rally-space.svg" />
        <TrustedByItem href="https://biblish.com/" src="biblish.svg" />
        <TrustedByItem href="https://estii.com/" src="estii.svg" />
        <TrustedByItem href="https://helphero.co/" src="helphero.svg" />
        <TrustedByItem href="https://www.konduktum.com/" src="konduktum.svg" />
        <TrustedByItem href="https://requestmetrics.com" src="request-metrics.svg" />
      </Marquee>
    </FadeBlock>
  );
};
