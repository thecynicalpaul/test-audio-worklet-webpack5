// export {};

import { math } from "src/math";
import {RingBuffer} from "./ring-buffer";
import {map} from "lodash";

class MyProcessor extends AudioWorkletProcessor {
  private buffer: RingBuffer;
  constructor() {
    super();
    console.info("Constructor works!");

    console.log(map([3, 2, 1], a => a));
    this.buffer = new RingBuffer(1024, 1);
  }
  public process(inputList: Float32Array[][]) {
    console.log(inputList?.[0]?.length);
    math(3, 54);
    return false;
  }
}

registerProcessor("processor", MyProcessor);

