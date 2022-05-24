import { NS } from '@ns';

let myMaxMoney: number;
let myMinSecLevel: number;
let targetSecLevel: number;
let thisServer: string;

let ns: NS;

function init(): void {
  thisServer = ns.getHostname();
  myMaxMoney = ns.getServerMaxMoney(thisServer);
  myMinSecLevel = ns.getServerMinSecurityLevel(thisServer);
  targetSecLevel = myMinSecLevel * 1.5;
}

export async function main(nsArg: NS): Promise<void> {
  ns = nsArg;
  init();

  while (true) {
    await weaken();

    await grow();

    await weaken();

    await hack();
  }
}

async function weaken(): Promise<void> {
  while (ns.getServerSecurityLevel(thisServer) > targetSecLevel) {
    await ns.weaken(thisServer);
  }
}

async function grow(): Promise<void> {
  while (ns.getServerMoneyAvailable(thisServer) < myMaxMoney * 0.9) {
    await weaken();
    await ns.grow(thisServer);
  }
}

async function hack(): Promise<void> {
  const currentMoney = ns.getServerMoneyAvailable(thisServer);
  await ns.hack(thisServer);
  const stolen = currentMoney - ns.getServerMoneyAvailable(thisServer);
  ns.print(`Stole ${stolen}`);
}
