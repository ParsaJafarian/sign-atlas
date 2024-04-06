declare module 'three/examples/jsm/loaders/FBXLoader' {
    import { Loader, LoadingManager } from 'three';
  
    export class FBXLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (object: any) => void,
        onProgress?: (event: ProgressEvent<EventTarget>) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
    }
  }