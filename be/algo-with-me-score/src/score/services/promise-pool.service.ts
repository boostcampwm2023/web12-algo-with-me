import { Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

class PromisePool {
  private promises: Promise<number>[] = [];
  private reserved: boolean[];

  constructor(
    private readonly containerCount: number,
    private readonly logger: Logger,
  ) {
    this.reserved = new Array<boolean>(containerCount).fill(false);
  }

  async add(asyncFn: (...args: any[]) => Promise<void>, args: { [key: number | string]: any }) {
    if (this.promises.length >= this.containerCount) {
      await Promise.race(this.promises);
    }

    const containerId = this.reserved.findIndex((value) => {
      return value === false;
    });
    this.reserved[containerId] = true;
    args.containerId = containerId;

    const newlyAddedPromise = this.makeTaskFunction(asyncFn, args)(containerId);
    newlyAddedPromise.then((containerId) => {
      this.promises = this.promises.filter((promise) => {
        return promise !== newlyAddedPromise;
      });
      this.reserved[containerId] = false;
      this.logger.debug(`채점 완료: ${JSON.stringify(args)}`);
    });

    this.promises.push(newlyAddedPromise);
  }

  private makeTaskFunction(
    asyncFn: (...args: any[]) => Promise<void>,
    args: { [key: number | string]: any },
  ) {
    return async function (containerId: number) {
      await asyncFn(args);
      return containerId;
    };
  }
}

export default PromisePool;
