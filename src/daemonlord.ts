import { NS } from '@ns';
import { ServerMap, nslog } from 'lib/common';

export async function main(ns: NS): Promise<void> {
  new DaemonLord(ns).start();
}

enum LordState {
  Breach = 1,
  Target,
  Weaken,
  Grow,
  Hack,
  Dead,
}

type LordStateStrings = keyof typeof LordState;

class DaemonLord {
  STATE_KEY = 'LordState';
  state: LordState;
  serverMap: ServerMap;
  ns: NS;

  constructor(ns: NS) {
    this.ns = ns;
    this.serverMap = new ServerMap();
    this.state = LordState.Breach;
    this.restoreState();
  }

  private preserveState() {
    localStorage.setItem(this.STATE_KEY, this.state.toString());
  }

  private restoreState() {
    const lss: LordStateStrings = (localStorage.getItem(this.STATE_KEY) as LordStateStrings) ?? LordState.Breach;
    this.state = LordState[lss];
  }

  async start(): Promise<void> {
    while (this.state != LordState.Dead) {
      this.process();
      await this.ns.asleep(10);
    }
  }

  abort() {
    this.state = LordState.Dead;
  }

  protected chainTo(script: string, args: string[] = []) {
    this.preserveState();
    nslog(this.ns, `handing off to ${script} with arguments ${args?.join(",")}`);
    this.ns.spawn(script, 1, ...args);
  }

  process(): void {
    switch (this.state) {
      case LordState.Breach:
        this.state = LordState.Target;
        this.chainTo('breach.js');
        break;
      case LordState.Target:
        this.findTarget();
        break;
      case LordState.Weaken:
        this.weaken();
        break;
      case LordState.Grow:
        this.grow();
        break;
      case LordState.Hack:
        this.hack();
        break;
      default:
        nslog(this.ns, `Interesting! I don't know what state I'm in!`);
        this.ns.exit();
    }
  }

  findTarget() {
    let efficiency = 0;
    let target = "";
    for (const h of this.serverMap.usableHosts()) {
      const serv = this.serverMap.servers[h];
      const maxMoney = serv.moneyMax;
      const minDiff = serv.minDifficulty;
      const hackAmount = this.ns.hackAnalyze(h);
      const hackTime = this.ns.getHackTime(h);
    }
  }

  weaken() {

  }

  grow() {

  }

  hack() {

  }
}
