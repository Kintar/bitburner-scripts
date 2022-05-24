import { NS, Server } from '@ns';

export class ServerMap {
  servers: Record<string, Server>;
  lastUpdate: number;

  constructor() {
    this.servers = {};
    this.lastUpdate = 0;
  }

  usableHosts(): string[] {
    const usables = [];
    for (const hostname in this.servers) {
      if (this.servers[hostname].hasAdminRights) {
        usables.push(hostname);
      }
    }

    return usables;
  }
}

export function localeTimestamp(ms = 0): string {
  if (!ms) {
    ms = new Date().getTime();
  }

  return new Date(ms).toLocaleTimeString();
}

export function nslog(ns: NS, message: string): void {
  ns.tprint(`[${localeTimestamp()}] ${message}`);
  ns.print(`[${localeTimestamp()}] ${message}`);
}

export interface IHackAnalysis {
  hostname: string;
  moneyGain: number;
  hackThreads: number;
  weakenThreads: number;
  growThreads: number;
  totalTime: number;
}

export const CONSTANTS = {
  ServerBaseGrowthRate: 1.03, // Unadjusted Growth rate
  ServerMaxGrowthRate: 1.0035, // Maximum possible growth rate (max rate accounting for server security)
  ServerFortifyAmount: 0.002, // Amount by which server's security increases when its hacked/grown
  ServerWeakenAmount: 0.05, // Amount by which server's security decreases when weakened
};

export function myWeakenAnalyze(threads: number, cores = 1): number {
  const coreBonus = 1 + (cores - 1) / 16;
  return CONSTANTS.ServerWeakenAmount * threads * coreBonus;
}
