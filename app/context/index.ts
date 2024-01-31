import { createContext } from "react";
import createCache from '@emotion/cache';

export function createEmotionCache() {
  return createCache({ key: 'css' });
}

export interface ClientStyleContextData {
  reset: () => void;
}

export default createContext<ClientStyleContextData>({
  reset: () => { },
});
