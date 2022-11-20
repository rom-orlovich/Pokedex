/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      INTERNAL_RENDER_DATABASE_URL: string;
      EXTERNAL_RENDER_DATABASE_URL: string;
    }
  }
}
