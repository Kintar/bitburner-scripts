import { NS } from '@ns';
import { findAllServers } from 'lib/helpers';
import { nslog } from 'lib/common';

const PortHacks = ['BruteSSH.exe', 'FTPCrack.exe', 'HTTPWorm.exe', 'SQLInject.exe', 'relaySMTP.exe'];

export async function main(ns: NS): Promise<void> {
  if (ns.getHostname() !== 'home') {
    throw new Error('Must run from home!');
  }

  let portHacks = 0;
  for (const f of ns.ls('home')) {
    if (PortHacks.includes(f)) {
      portHacks++;
    }
  }

  let hackSkill = ns.getHackingLevel();

  const serverMap = findAllServers(ns);
  const executables = ns.ls('home');
  for (const hostname in serverMap.servers) {
    const host = serverMap.servers[hostname];
    if (!host.hasAdminRights && host.numOpenPortsRequired <= portHacks) {
      if (breach(ns, hostname)) {
        host.hasAdminRights = true;
        await ns.scp(ns.ls('home', '.js'), hostname);
      } else {
        nslog(ns, `Could not breach ${hostname}`);
      }
    }
  }
}

function breach(ns: NS, host: string): boolean {
  try {
    ns.brutessh(host);
  } catch {}
  try {
    ns.ftpcrack(host);
  } catch {}
  try {
    ns.relaysmtp(host);
  } catch {}
  try {
    ns.httpworm(host);
  } catch {}
  try {
    ns.sqlinject(host);
  } catch {}
  try {
    ns.nuke(host);
  } catch {
    return false;
  }

  return true;
}
