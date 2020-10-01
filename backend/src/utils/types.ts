export interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  TCB_ENVID: string,
  SECRETID: string,
  SECRETKEY: string,
}

export interface TcbConfig {
  env: string,
  secretId?: string,
  secretKey?: string,
}