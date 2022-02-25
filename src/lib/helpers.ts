import { NS } from '@ns';

export function findAllServers(ns: NS): string[] {
  let discoveredServers: string[] = [];
  let hostsToScan = ['home'];
  while (hostsToScan.length > 0) {
    const hostName = hostsToScan.pop();
    for (const child of ns.scan(hostName)) {
      if (!discoveredServers.includes(child)) {
        hostsToScan.push(child);
        discoveredServers.push(child);
      }
    }
  }
  return discoveredServers;
}
