import autobind from 'autobind-decorator';

type HandleFunction = () => void;

export default class IntervalHelper {
  private static instance: IntervalHelper;

  private animFrameHandle: number;
  private functions: HandleFunction[];

  static getInstance() {
    if (!this.instance) {
      this.instance = new IntervalHelper();
    }

    return this.instance;
  }

  constructor() {
    this.animFrameHandle = 0;
    this.functions = [];
  }

  @autobind
  animFrameFn() {
    this.functions.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Interval handle threw error', err);
      }
    });

    this.animFrameHandle = requestAnimationFrame(this.animFrameFn);
  }

  add(fn: HandleFunction) {
    const index = this.functions.indexOf(fn);
    if (index > -1) {
      throw new Error('Handler already added');
    }

    this.functions.push(fn);

    if (!this.animFrameHandle) {
      this.animFrameHandle = requestAnimationFrame(this.animFrameFn);
    }
  }

  remove(fn: HandleFunction) {
    const index = this.functions.indexOf(fn);
    if (index === -1) {
      throw new Error('Handler already removed');
    }

    this.functions.splice(index, 1);

    if (this.functions.length === 0) {
      cancelAnimationFrame(this.animFrameHandle);
      this.animFrameHandle = 0;
    }
  }
}
