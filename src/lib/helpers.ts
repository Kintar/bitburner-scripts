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


export function estimateHackPercentage(hackDifficulty: number, requiredHackingSkill: number, hackingSkill: number): number {
  const balanceFactor = 240;

  const difficultyMult = (100 - hackDifficulty) / 100;
  const skillMult = (hackingSkill - (requiredHackingSkill - 1)) / hackingSkill;
  const percentMoneyHacked = (difficultyMult * skillMult) / balanceFactor;
  if (percentMoneyHacked < 0) {
    return 0;
  }
  if (percentMoneyHacked > 1) {
    return 1;
  }

  return percentMoneyHacked;
}

/* Estimates BN1 hacking times, not taking any modifiers into account */
export function estimateHackingTime(requiredSkill: number, difficulty: number, playerSkill: number): number {
  const difficultyMult = requiredSkill * difficulty;

  const baseDiff = 500;
  const baseSkill = 50;
  const diffFactor = 2.5;
  let skillFactor = diffFactor * difficultyMult + baseDiff;
  // tslint:disable-next-line
  skillFactor /= playerSkill + baseSkill;

  const hackTimeMultiplier = 5;
  const hackingTime =
    (hackTimeMultiplier * skillFactor);

  // Time is in seconds, so convert to ms
  return hackingTime * 1000;
}
