import { NS, Server } from '@ns';
import { ServerMap } from '/lib/common';

export function findAllServers(ns: NS): ServerMap {
  const discoveredServers: string[] = [];
  const serverMap = new ServerMap();

  const hostsToScan = ['home'];
  while (hostsToScan.length > 0) {
    const hostName = hostsToScan.pop();
    for (const child of ns.scan(hostName)) {
      if (!discoveredServers.includes(child)) {
        hostsToScan.push(child);
        discoveredServers.push(child);
        serverMap.servers[child] = ns.getServer(child);
      }
    }
  }

  return serverMap;
}
