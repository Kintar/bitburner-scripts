import { NS } from '@ns';
import { ServerMap } from 'lib/common';

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
      await this.ns.asleep(10);
    }
  }
}
