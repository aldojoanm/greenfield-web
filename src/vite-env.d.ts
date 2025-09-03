/// <reference types="vite/client" />

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

declare module 'fullpage.js' {
  const fullpage: any;
  export default fullpage;
}
