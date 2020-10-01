import tcb from '@cloudbase/node-sdk';
import { isDevEnv } from './tools';
import { TcbConfig} from './types';

export const getTcbApp = () => {
  const options: TcbConfig = {
    env: process.env.TCB_ENVID,
  }

  if(isDevEnv()) {
    Object.assign(options, {
      secretId: process.env.SECRETID,
      secretKey: process.env.SECRETKEY,
    })
  }

  const app = tcb.init(options);

  return app;
}