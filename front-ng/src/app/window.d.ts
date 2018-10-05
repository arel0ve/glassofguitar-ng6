import { Guitar } from './guitar/guitar';

declare global {
  interface Window {
    guitar: Guitar;
  }
}
