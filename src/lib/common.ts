import { NS, Server } from '@ns';

export async function main(/* ns: NS */): Promise<void> {
  throw new Error('Do not run me manually!');
}

export type ServerMap = Record<string, Server>;

export class Common {
  public readonly ns: NS;
  public servers: ServerMap;
  public lastServerUpdate: number;

  constructor(ns: NS) {
    this.ns = ns;
    this.servers = {};
    this.lastServerUpdate = 0;
  }
}
