import { NS, Server } from '@ns';

export async function main(/* ns: NS */): Promise<void> {
  throw new Error('Do not run me manually!');
}

export interface ServerMap {
  servers: Record<string, Server>;
  lastUpdateTimestamp: number;
}

export class Common {
  public readonly ns: NS;
  public servers: ServerMap;

  constructor(ns: NS) {
    this.ns = ns;
    this.servers = {
      servers: {},
      lastUpdateTimestamp: 0,
    };
  }
}
