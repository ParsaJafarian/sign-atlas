declare module "three/examples/jsm/loaders/STLLoader" {
  import { Loader, LoadingManager } from "three";

  export class STLLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: any) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
  }
}
