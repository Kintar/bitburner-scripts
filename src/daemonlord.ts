import { NS } from '@ns';
import { nslog, ServerMap } from 'lib/common';

export async function main(ns: NS): Promise<void> {
  await new DaemonLord(ns).start();
}

interface StateData {
  currentState: LordState;
  currentTarget: string;
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
  stateData: StateData;
  serverMap: ServerMap;
  ns: NS;

  constructor(ns: NS) {
    this.ns = ns;
    this.serverMap = new ServerMap();
    this.stateData = {
      currentState: LordState.Breach,
      currentTarget: '',
    };

    this.restoreState();
  }

  private preserveState() {
    localStorage.setItem(this.STATE_KEY, this.stateData.toString());
  }

  private restoreState() {
    const stateJson = localStorage.getItem(this.STATE_KEY);
    if (stateJson == null) return;
    this.stateData = JSON.parse(stateJson);
  }

  async start(): Promise<void> {
    while (this.stateData.currentState != LordState.Dead) {
      this.process();
      await this.ns.asleep(10);
    }
  }

  protected setState(state: LordState) {
    this.stateData.currentState = state;
  }

  abort() {
    this.setState(LordState.Dead);
  }

  protected chainTo(script: string, args: string[] = []) {
    this.preserveState();
    nslog(this.ns, `handing off to ${script} with arguments ${args?.join(',')}`);
    this.ns.spawn(script, 1, ...args);
  }

  process(): void {
    switch (this.stateData.currentState) {
      case LordState.Breach:
        this.setState(LordState.Target);
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
    const efficiency = 0;
    const target = '';
    for (const h of this.serverMap.usableHosts()) {
      const serv = this.serverMap.servers[h];
      const maxMoney = serv.moneyMax;
      const minDiff = serv.minDifficulty;
      const hackAmount = this.ns.hackAnalyze(h);
      const hackTime = this.ns.getHackTime(h);
    }
  }

  weaken() {
    throw new Error('not implemented');
  }

  grow() {
    throw new Error('not implemented');
  }

  hack() {
    throw new Error('not implemented');
  }
}
