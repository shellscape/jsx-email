import { makeAutoObservable, runInAction } from 'mobx';

import { gather, getNestedStructure } from '../lib/templates';
import type { TemplateData, TemplatePart } from '../lib/types';

export class ColorSchemeStore {
  preference = window.localStorage.getItem('colorScheme') || 'system';

  constructor() {
    this.applyPreference();
    makeAutoObservable(this);
  }

  setPreference(to: 'dark' | 'light' | 'system') {
    this.preference = to;
    localStorage.setItem('colorScheme', to);

    this.applyPreference();
  }

  getCurrentColorScheme() {
    return this.preference === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light'
      : this.preference;
  }

  applyPreference() {
    const bodyEl = document.querySelector('body');
    if (!bodyEl)
      throw new Error('Body was not found while trying to apply color scheme preferences.');

    const currentColorScheme = this.getCurrentColorScheme();

    ['dark', 'light'].forEach((colorScheme) =>
      bodyEl.classList.toggle(colorScheme, currentColorScheme === colorScheme)
    );
  }
}

export class SidebarStore {
  // TODO: import & use tailwind lg: value
  breakpoint = 1024;
  isOpen = window.innerWidth > this.breakpoint;

  constructor() {
    makeAutoObservable(this);
  }

  setIsOpen(to: boolean) {
    this.isOpen = to;
  }
}

type TemplatesRecords = Record<string, TemplateData>;

export class TemplatesStore {
  isReady = false;
  records: TemplatesRecords = {};
  parts: TemplatePart[] = [];

  constructor() {
    gather().then((res) => runInAction(() => this.updateRecords(res)));
    makeAutoObservable(this);
  }

  updateRecords(records: TemplatesRecords) {
    this.records = records;
    this.parts = getNestedStructure(Object.values(records));
    this.isReady = true;
  }
}

export class AppStore {
  sidebar = new SidebarStore();
  templates = new TemplatesStore();
  colorScheme = new ColorSchemeStore();

  constructor() {
    makeAutoObservable(this);
  }
}
