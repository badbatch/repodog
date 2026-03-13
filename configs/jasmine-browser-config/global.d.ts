import { type Jsonifiable } from 'type-fest';

declare global {
  interface GlobalThis {
    __coverage__: Jsonifiable;
  }
}
