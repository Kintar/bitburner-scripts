import { NS } from '@ns';
import { Common } from '/lib/common';

export async function main(ns: NS): Promise<void> {
  const breacher = new Breacher(new Common(ns));
  breacher.breach();
}

class Breacher {
  private common: Common;
  private ns: NS;
  private currentHost: string;
  private scanlist: string[];

  constructor(common: Common) {
    this.common = common;
    this.ns = common.ns;
    this.currentHost = '';
    this.scanlist = [];
  }

  public breach(host = 'home', hackSkill = 0) {
    this.currentHost = host;
    if (hackSkill === 0) {
      hackSkill = ns.getHackingLevel();
    }
  }
}
