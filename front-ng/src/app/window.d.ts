import { Guitar } from './workspace-page/guitar/guitar';

declare global {
  interface Window {
    guitar: Guitar;
  }
}
