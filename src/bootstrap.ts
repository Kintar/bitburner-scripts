import { NS } from '@ns';

interface IArgs {
  server: string;
}

export async function main(ns: NS): Promise<void> {
  const args: IArgs = ns.flags([['server', 'n00dles']]);
  ns.print(`Bootstrapping for server '${args.server}`);

  try {
    if (ns.hasRootAccess(args.server)) {
      ns.print('We already have root access...');
    } else {
      ns.print('Nuking...');
      ns.nuke(args.server);
    }
  } catch (e) {
    const err = e as Error;
    ns.print(`Error nuking: ${err.message}`);
    throw err;
  }

  try {
    ns.print('Copying target bootstrapper...');
    await ns.scp('target-bootstrap.js', args.server);
  } catch (e) {
    const err = e as Error;
    ns.print(`Error copying: ${err.message}`);
    throw err;
  }

  try {
    ns.print('Starting target hacking script...');
    await ns.exec('target-bootstrap.js', args.server);
  } catch (e) {
    const err = e as Error;
    ns.print(`Error starting: ${err.message}`);
    throw err;
  }

  ns.print('Done.');
}
