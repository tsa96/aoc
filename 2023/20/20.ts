import * as fs from "node:fs";

const DEBUG = false;

enum Mod {
  FF,
  CON,
  BROAD,
  GENERIC
}

type Pulse = { from: Module; to: Module; energy: boolean };

// Can rework to be faster if needed - V8 may have some optimisations that make < 0(n) anyway
class Queue<T> {
  items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T {
    return this.items.shift();
  }

  length(): number {
    return this.items.length;
  }
}

abstract class Module {
  name: string;
  type: Mod;

  pulses = [0, 0];
  dests: Module[] = [];
  destStrings: string[];

  queue: Queue<Pulse>;

  constructor(name: string, queue: Queue<Pulse>, dests: string[]) {
    this.name = name;
    this.destStrings = dests;
    this.queue = queue;
  }

  connect(modList: Record<string, Module>) {
    for (const str of this.destStrings) {
      let mod = modList[str];
      if (!mod) {
        mod = new GenericModule(str, this.queue, []);
        modList[str] = mod;
      }
      this.dests.push(mod);
    }
  }

  backConnect(..._: any[]) {}

  abstract processPulse(pulse?: Pulse): void;

  sendPulses(energy: boolean) {
    for (const dest of this.dests) {
      this.queue.enqueue({ from: this, to: dest, energy });
      this.pulses[energy ? 1 : 0]++;
      if (DEBUG) {
        console.log(`${this.name} -${energy ? "high" : "low"}-> ${dest.name}`);
      }
    }
  }
}

class Broadcaster extends Module {
  type = Mod.BROAD;

  processPulse(_: unknown) {
    this.sendPulses(false);
  }
}

class GenericModule extends Module {
  type = Mod.GENERIC;
  processPulse = () => void 0;
}

class Ff extends Module {
  type = Mod.FF;
  state = false;

  processPulse({ energy }: Pulse) {
    if (energy) return;

    this.sendPulses(!this.state);

    this.state = !this.state;
  }
}

class Con extends Module {
  type = Mod.CON;
  state: Record<string, boolean> = {};

  // guuuuuh this is stupid
  override backConnect(modList: Record<string, Module>) {
    Object.values(modList)
      .filter((mod) => mod.dests.some((dest) => dest.name == this.name))
      .forEach(({ name }) => (this.state[name] = false));
  }

  processPulse({ from, energy }: Pulse) {
    this.state[from.name] = energy;

    const allHigh = Object.values(this.state).every((v) => v);

    this.sendPulses(!allHigh);
  }
}

class Configuration {
  queue = new Queue<Pulse>();
  mods: Record<string, Module> = Object.fromEntries(
    fs
      .readFileSync("./20/input.txt")
      .toString()
      .trim()
      .split("\n")
      .map((line: string) => {
        let [l, r] = line.split(" -> ");
        const dests = r.split(", ");

        if (l == "broadcaster")
          return [
            "broadcaster",
            new Broadcaster("broadcaster", this.queue, dests)
          ];

        const name = l.slice(1);
        return [
          name,
          l[0] == "%"
            ? new Ff(name, this.queue, dests)
            : new Con(name, this.queue, dests)
        ];
      })
  );
  buttonPushes = [0, 0];

  constructor() {
    Object.values(this.mods).forEach((m) => m.connect(this.mods));
    Object.values(this.mods).forEach(
      (m) => m instanceof Con && m?.backConnect(this.mods)
    );
  }

  pushButton(times = 1, rangeFinder = {}) {
    for (let i = 0; i < times; i++) {
      this.mods["broadcaster"].processPulse();

      this.buttonPushes[0]++;
      let tmp;
      while (this.queue.length() > 0) {
        const pulse = this.queue.dequeue();
        if (pulse.to.name == "rx") {
          Object.entries((pulse.from as Con).state).forEach(([name, s]) => {
            if (s && tmp != i) {
              tmp = i;
              if (rangeFinder[name]) {
                rangeFinder[name].push(i);
              } else {
                rangeFinder[name] = [i];
              }
            }
          });
        }

        this.mods[pulse.to.name].processPulse(pulse);
      }
    }
  }

  sumPulses() {
    return Object.values(this.mods).reduce(
      (acc, { pulses: [low, high] }) => {
        acc[0] += low;
        acc[1] += high;
        return acc;
      },
      [this.buttonPushes[0], this.buttonPushes[1]]
    );
  }
}

console.time("init");
const config = new Configuration();
console.timeEnd("init");

// Part 1
// console.time("part1");
// config.pushButton(1000);
// const [low, high] = config.sumPulses();
// console.log({ low, high, product: low * high });
// console.timeEnd("part1");

// Part 2
// Spam the button and see if we spot a pattern?
const rangeFinder = {};
config.pushButton(100000, rangeFinder);

// for (const [name, range] of Object.entries(rangeFinder))
//   console.log("name :", range[2] - range[1], range[1] - range[0]);

// Okay we have cycles, LCM of all

const ranges = Object.values(rangeFinder).map((range) => range[1] - range[0]);

const gcd = (x, y) => (y == 0 ? x : gcd(y, x % y));
const lcm = (x, y) => (x * y) / gcd(x, y);

console.log(ranges.slice(1).reduce((a, c) => lcm(a, c), ranges[0]));

// Maybe classes here was overkill, but I was extremely tired when doing this and
// getting everything in simple structures helps me familiarize myself with the
// question, also easy to debug.

// This took me an embarassingly long time to read and understand at first, but
// impl of both parts took about 90m, 100th place is about 50m.