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

export function localeTimestamp(ms = 0) {
  if (!ms) {
    ms = new Date().getTime();
  }

  return new Date(ms).toLocaleTimeString();
}

export function nslog(ns: NS, message: string) {
  ns.tprint(`[${localeTimestamp()}] ${message}`);
  ns.print(`[${localeTimestamp()}] ${message}`);
}
