import { type CSSProperties } from "react";

export interface IHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface TreeNode {
  name: string;
  type: string;
  title: string;
  children: TreeNode[];
  items?: TreeNode[];
}

declare global {
  interface Window {
    inkeepWidget: {
      render: () => void;
    };
  }
}

interface SponsorCSS extends CSSProperties {
  "max-width"?: string;
  "aspect-ratio"?: string | number;
}

export interface ISponsor {
  tier: {
    name: string;
    isOneTime: boolean;
  };
  sponsorEntity: {
    __typename: string;
    login: string;
    name: string;
    avatarUrl: string;
  };
  followLink?: boolean;
  popover?: string;
  badge?: string;
  createdAt: string;
  isActive: boolean;
  imageType?: ImageType;
  lightStyle?: SponsorCSS;
  darkStyle?: SponsorCSS;
}

export enum ImageType {
  IMAGE = "image",
  SVG = "svg",
}

type ImageSrc =
  | string
  | {
      darkThemeSrc: string;
      lightThemeSrc: string;
    };

export interface ISupportingElement {
  imageSrc: ImageSrc;
  sponsorUrl?: string;
  badge?: string;
  lightStyle?: SVGProps;
  darkStyle?: SVGProps;
}

export type ErrorCallback = (error: Error | FetchError) => void;
export type LoadCallback = (src: string, isCached: boolean) => void;
export type PlainObject<T = unknown> = Record<string | number | symbol, T>;
export type PreProcessorCallback = (code: string) => string;
export interface SVGProps
  extends Omit<React.SVGProps<SVGElement>, "onLoad" | "onError" | "ref"> {
  baseURL?: string;
  cacheRequests?: boolean;
  children?: React.ReactNode;
  description?: string;
  fetchOptions?: RequestInit;
  innerRef?: React.Ref<SVGElement>;
  loader?: React.ReactNode;
  onError?: ErrorCallback;
  onLoad?: LoadCallback;
  preProcessor?: PreProcessorCallback;
  src?: string;
  title?: string | null;
  uniqueHash?: string;
  uniquifyIDs?: boolean;
}
export interface State {
  content: string;
  element: React.ReactNode;
  hasCache: boolean;
  status: string;
}
export interface FetchError extends Error {
  code: string;
  errno: string;
  message: string;
  type: string;
}
export interface StorageItem {
  content: string;
  status: string;
}

export interface ICard {
  title: string;
  imageSrc: ImageSrc;
  description: string;
  href: string;
  lightStyle?: SVGProps;
  darkStyle?: SVGProps;
}

export interface ICards {
  [key: string]: ICard;
}
