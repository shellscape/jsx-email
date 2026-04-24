export const sponsorConfig: {
  [key: string]: {
    header: string;
    size: number;
    emoji: string;
    hasCard: boolean;
    hasName: boolean;
    columnSize: number;
    rowSize: number;
  };
} = {
  hero: {
    header: "Hero",
    emoji: "🦸",
    size: 84,
    hasName: true,
    hasCard: true,
    columnSize: 110,
    rowSize: 134,
  },
  gold: {
    header: "Gold",
    emoji: "🥇",
    size: 70,
    hasName: true,
    hasCard: true,
    columnSize: 110,
    rowSize: 134,
  },
  silver: {
    header: "Silver",
    emoji: "🥈",
    size: 50,
    hasName: true,
    hasCard: false,
    columnSize: 110,
    rowSize: 134,
  },
  bronze: {
    header: "Bronze",
    emoji: "🥉",
    size: 42,
    hasName: false,
    hasCard: false,
    columnSize: 110,
    rowSize: 134,
  },
  ramen: {
    header: "Ramen",
    emoji: "🍜",
    size: 38,
    hasName: false,
    hasCard: false,
    columnSize: 110,
    rowSize: 134,
  },
  coffee: {
    header: "Coffee",
    emoji: "☕️",
    size: 35,
    hasName: false,
    hasCard: false,
    columnSize: 110,
    rowSize: 134,
  },
  past: {
    header: "Past",
    emoji: "🕣",
    size: 25,
    hasName: false,
    hasCard: false,
    columnSize: 110,
    rowSize: 134,
  },
};
