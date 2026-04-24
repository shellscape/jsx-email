import { customSponsors } from "@/data/custom-sponsors";
import { rotateArrayDaily } from "@/utils";
import { type ISponsor } from "@/types";

interface AnchorProps {
  viewportHeight: number;
  anchors: {
    id: string;
    offsetTop: number;
  }[];
  scrollTop: number;
}

export const handleAnchorHighlighting = (props: AnchorProps) => {
  const activeAnchors: string[] = [];

  const { anchors } = props;

  for (let i = anchors.length - 1; i >= 0; i--) {
    const anchorTop = anchors[i].offsetTop;

    if (
      anchorTop < props.scrollTop + props.viewportHeight &&
      anchorTop + 75 > props.scrollTop
    ) {
      activeAnchors.push(anchors[i].id);
    }
  }

  const closestAnchor = anchors.find(
    (anchor) => anchor.offsetTop > props.scrollTop,
  );

  if (closestAnchor && closestAnchor.offsetTop - 75 > props.scrollTop) {
    const index = anchors.findIndex(
      (anchor) => anchor.offsetTop === closestAnchor.offsetTop,
    );
    if (index !== -1) {
      const item = anchors[index - 1];
      if (item && !activeAnchors.includes(item.id)) {
        activeAnchors.push(item.id);
      }
    }
  }

  if (!closestAnchor) {
    activeAnchors.push(anchors[anchors.length - 1]?.id);
  }

  return activeAnchors;
};

export const sponsorsHandler = async () => {
  const response = await fetch("https://api.drizzle.team/v2/sponsors");
  const { sponsors } = await response.json();

  const allSponsors = [...customSponsors, ...sponsors];
  let pastSponsors: ISponsor[] = [];

  const currentDate = new Date();
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  const filterFunc = (item: ISponsor) => {
    const isWithinOneMonth =
      currentDate.getTime() - new Date(item.createdAt).getTime() <
      oneMonthInMilliseconds;
    if (
      (isWithinOneMonth || item.isActive) &&
      item.sponsorEntity.name !== "usemotion"
    ) {
      return true;
    }
    if (!isWithinOneMonth || !item.isActive) {
      pastSponsors.push(item);
    }
    return false;
  };

  let superhero: ISponsor[] = [];
  let hero: ISponsor[] = [];
  let gold: ISponsor[] = [];
  let silver: ISponsor[] = [];
  let bronze: ISponsor[] = [];
  let ramen: ISponsor[] = [];
  let coffee: ISponsor[] = [];

  allSponsors.forEach((s) => {
    const regex = s.tier.name.match(/[0-9]+(,[0-9]+)*/gi);
    if (regex) {
      const num = +regex[0].replace(/,/, "");
      if (num < 25) {
        coffee.push(s);
      }
      if (num >= 25 && num < 100) {
        ramen.push(s);
      }
      if (num >= 100 && num < 250) {
        bronze.push(s);
      }
      if (num >= 250 && num < 1000) {
        silver.push(s);
      }
      if (num >= 1000 && num < 2500) {
        gold.push(s);
      }
      if (num >= 2500 && num < 10000) {
        hero.push(s);
      }
      if (num >= 10000) {
        superhero.push(s);
      }
    }
  });

  gold = gold.filter((s) => s.sponsorEntity.login !== "samalberto25" && s.sponsorEntity.login !== "lokalise");
  hero = hero.filter((s) => s.sponsorEntity.login !== "railwayapp" && s.sponsorEntity.login !== "railway");

  superhero = superhero.filter((s) => filterFunc(s));
  hero = hero.filter((s) => filterFunc(s));
  gold = gold.filter((s) => filterFunc(s));
  silver = silver.filter((s) => filterFunc(s));
  bronze = bronze.filter((s) => filterFunc(s));
  ramen = ramen.filter((s) => filterFunc(s));
  coffee = coffee.filter((s) => filterFunc(s));

  pastSponsors = pastSponsors.filter(
    (s) =>
      s.sponsorEntity.login !== "chiselstrike" &&
      s.sponsorEntity.login !== "unkeyed",
  );

  const arrays = [
    {
      name: "hero",
      items: rotateArrayDaily(hero),
    },
    {
      name: "gold",
      items: rotateArrayDaily(gold),
    },
    {
      name: "silver",
      items: rotateArrayDaily(silver),
    },
    {
      name: "bronze",
      items: rotateArrayDaily(bronze),
    },
    {
      name: "ramen",
      items: rotateArrayDaily(ramen),
    },
    {
      name: "coffee",
      items: rotateArrayDaily(coffee),
    },
    {
      name: "past",
      items: rotateArrayDaily(pastSponsors),
    },
  ];

  return arrays;
};

export const updateDialectLinks = () => {
  const linksWithDialects = document.querySelectorAll("[data-href]");
  const savedDialect = localStorage.getItem("dialect") || "pg";

  linksWithDialects.forEach((link) => {
    const href = (link as HTMLAnchorElement).dataset.href;
    (link as HTMLAnchorElement).href = `${href}/${savedDialect}`;
  });
};