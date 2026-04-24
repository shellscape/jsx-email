import type { ImageMetadata } from "astro";

import aarondfrancis from "@/assets/images/tweets/aarondfrancis.jpg";
import anthonysheww from "@/assets/images/tweets/anthonysheww.jpg";
import imfelquis from "@/assets/images/tweets/imfelquis.jpg";
import raynirola from "@/assets/images/tweets/raynirola.jpg";
import t3dotgg from "@/assets/images/tweets/t3dotgg.jpg";
import thdxr from "@/assets/images/tweets/thdxr.jpg";
import tslamoon1 from "@/assets/images/tweets/tslamoon1.jpg";
import lightgrey from "@/assets/images/tweets/lightgrey.svg";
import adamdotdev from "@/assets/images/tweets/adamdotdev.jpg";
import jamesrperkins from "@/assets/images/tweets/james_r_perkins.jpg";
import saltyAom from "@/assets/images/tweets/saltyAom.jpg";
import FredKSchott from "@/assets/images/tweets/FredKSchott.jpg";
import JacobWolf from "@/assets/images/tweets/JacobWolf.jpg";
import jamesrperkinsTweet from "@/assets/images/tweets/jamesrperkinsTweet.png";
import saltyAomTweet from "@/assets/images/tweets/saltyAomTweet.jpg";
import EddyVinckk from "@/assets/images/tweets/EddyVinckk.jpg";
import chribjel from "@/assets/images/tweets/chribjel.jpg";
import chribjelTweet from "@/assets/images/tweets/chribjelTweet.png";
import hisbvdis from "@/assets/images/tweets/hisbvdis.jpg";
import aokijs from "@/assets/images/tweets/aokijs.jpg";
import silvenon from "@/assets/images/tweets/silvenon.jpg";
import silvenonTweet from "@/assets/images/tweets/silvenonTweet.webp";
import spacesexdragon from "@/assets/images/tweets/spacesexdragon.jpg";
import spacesexdragonTweet from "@/assets/images/tweets/spacesexdragonTweet.jpg";
import brodaNoel from "@/assets/images/tweets/brodaNoel.jpg";
import jacobmparis from "@/assets/images/tweets/jacobmparis.jpg";
import lroal from "@/assets/images/tweets/lroal.png";

// Tweet images

export interface ITweet {
  avatar: ImageMetadata;
  name: string;
  login: string;
  text?: string;
  href?: string;
  tweetImage?: ImageMetadata;
}

export const tweets: ITweet[] = [
  {
    avatar: thdxr,
    name: "Dax",
    login: "thdxr",
    text: "I hate Drizzle",
    href: "https://x.com/thdxr/status/1719129834901721353?s=20",
  },
  {
    avatar: anthonysheww,
    name: "Anthony Shew",
    login: "anthonysheww",
    text: "I hate @DrizzleOrm so much that I wrote the Auth.js adapter for it.",
    href: "https://x.com/anthonysheww/status/1688973391917969408?s=20",
  },
  {
    avatar: adamdotdev,
    name: "Adam",
    login: "adamdotdev",
    text: `i know this won't get me on the homepage, but 
    
@DrizzleORM is so good`,
    href: "https://x.com/adamdotdev/status/1749463315355508917?s=20",
  },
  {
    avatar: lightgrey,
    name: "Some Body",
    login: "dont_know",
    text: "Django had it in 2008",
  },
  {
    avatar: EddyVinckk,
    name: "Eddy Vinck",
    login: "EddyVinckk",
    text: `I love @DrizzleORM\n\nthat's it, that's the tweet`,
    href: "https://x.com/EddyVinckk/status/1770052528941478333?s=20",
  },
  {
    avatar: JacobWolf,
    name: "Jacob Wolf 🐝",
    login: "JacobWolf",
    text: "I love @DrizzleORM.",
    href: "https://x.com/JacobWolf/status/1768061278776349151?s=20",
  },
  {
    avatar: t3dotgg,
    name: "Theo",
    login: "t3dotgg",
    text: "Drizzle is terrible. It doesn’t even support Mongo.",
    href: "https://x.com/t3dotgg/status/1787604253860847775",
  },
  {
    avatar: brodaNoel,
    name: "Broda Noel",
    login: "BrodaNoel",
    text: "Is this a joke? Because if this is a joke, it's really really really bad joke, because now I'm fucking hating @DrizzleORM without even knowing who they are.\nI mean, this is not a good marketing strategy if this was a marketing-joke.\nAnd if it's actually true, I'll hate them more.",
    href: "https://x.com/BrodaNoel/status/1913248949252616287",
  },

  {
    avatar: imfelquis,
    name: "Ofelquis Gimenes",
    login: "imfelquis",
    text: "unpredictable results is what feeds the human race, ban Drizzle now and all this typing gibberish all together",
    href: "https://x.com/imfelquis/status/1709919386931462516?s=20",
  },
  {
    avatar: jamesrperkins,
    name: "James Perkins",
    login: "james_r_perkins",
    text: "Sorry @DrizzleORM you suck!",
    href: "https://x.com/james_r_perkins/status/1766156735155196201?s=20",
    tweetImage: jamesrperkinsTweet,
  },
  {
    avatar: tslamoon1,
    name: "tslamoon",
    login: "tslamoon1",
    text: "I'll shave my head if drizzle adds MSSQL support by the end of September.",
    href: "https://x.com/tslamoon1/status/1700416378237530419?s=20",
  },
  {
    avatar: FredKSchott,
    name: "fks",
    login: "FredKSchott",
    text: "Astro DB is powered by Drizzle! ... and we regret everything omg this thing sucks",
    href: "https://x.com/FredKSchott/status/1767646959656194473?s=20",
  },
  {
    avatar: raynirola,
    name: "Ray",
    login: "_raynirola",
    text: 'DrizzleOrm is not an "ORM", it\'s merely a overrated typesafe sql wrapper, not even a query builder.',
    href: "https://x.com/_raynirola/status/1666028176789872642?s=20",
  },
  {
    avatar: saltyAom,
    name: "SaltyAom",
    login: "saltyAom",
    text: `Prisma Bun: 1.4 MB/s\nDrizzle Bun: 9.8 MB/s`,
    href: "https://x.com/saltyAom/status/1767783124342276526?s=20",
    tweetImage: saltyAomTweet,
  },
  {
    avatar: chribjel,
    name: "Christoffer Bjelke",
    login: "chribjel",
    text: `How many times has this little shit snuck into your dependencies?`,
    href: "https://x.com/chribjel/status/1778851727954837727",
    tweetImage: chribjelTweet,
  },
  {
    avatar: hisbvdis,
    name: "Roma Zvarych",
    login: "hisbvdis",
    text: `I have finally switched from @prisma to @DrizzleORM.\nIt was not easy.\nDear Drizzle Team, you have created an awesome orm with awfull documentation.\nAnyway, good for you, thanks and good luck.`,
    href: "https://x.com/hisbvdis/status/1807783878515400977",
  },
  {
    avatar: jacobmparis,
    name: "@jacobparis.com",
    login: "jacobmparis",
    text: "@DrizzleORM can you put me on the homepage? \ngf says it’s drizzling outside and I want to send a link to your site",
    href: "https://x.com/jacobmparis/status/1955767013596369283",
  },
  {
    avatar: aokijs,
    name: "Aoki",
    login: "aokijs",
    text: `Honestly, fuck the benchmarks. I don‘t care which one‘s faster. All I can say is that Drizzle made my life working with databases dramastically better and that‘s all that matters for me. Thanks for your hard work 🙏🏻`,
    href: "https://x.com/aokijs/status/1833840766839325109",
  },
  {
    avatar: silvenon,
    name: "Matija Marohnić",
    login: "silvenon",
    text: `Every time I hear about @DrizzleORM.`,
    href: "https://x.com/silvenon/status/1843003214402314695",
    tweetImage: silvenonTweet,
  },
  {
    avatar: spacesexdragon,
    name: "Joseph Mama 🐀",
    login: "spacesexdragon",
    href: "https://x.com/spacesexdragon/status/1843381135134675236",
    tweetImage: spacesexdragonTweet,
  },
  {
    avatar: aarondfrancis,
    name: "Aaron Francis",
    login: "aarondfrancis",
    text: "Y'all should just copy everything Eloquent has",
    href: "https://x.com/aarondfrancis/status/1641145228189892613?s=20",
  },
  {
    avatar: lroal,
    name: "Lars-Erik Roald",
    login: "lroal",
    text: "Complete rewrites of core systems + new type system + new dialects + new migration engine = recipe for unexpected bugs. Claiming it'll fix 70% of existing bugs while introducing a whole new generation of them is peak software optimism",
    href: "https://x.com/lroal/status/1971463955358097499",
  },
];
