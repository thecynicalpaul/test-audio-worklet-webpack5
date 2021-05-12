export class RingBuffer {
  private bufferLength: number;
  private channelCount: number;

  private readIndex: number;
  private writeIndex: number;
  private availableFramesCount: number;

  private channelData: Float32Array[];

  constructor(bufferLength: number, channelCount: number) {
    this.readIndex = 0;
    this.writeIndex = 0;
    this.availableFramesCount = 0;

    this.channelCount = channelCount;
    this.bufferLength = bufferLength;
    this.channelData = [];
    for (let i = 0; i < channelCount; i += 1) {
      this.channelData[i] = new Float32Array(bufferLength);
    }
  }

  public getAvailableFrameCount() {
    return this.availableFramesCount;
  }

  /**
   * Push a data sequence of Float32Arrays to the internal buffer.
   */
  public push(arraySequence: Float32Array[]) {


    // console.log("@@ PUSHING", arraySequence);
    // Write the sequence into the internal buffer using a circular array
    const sourceLength = arraySequence[0]?.length ?? 0;
    for (let i = 0; i < sourceLength; i += 1) {
      const writeIndex = (this.writeIndex + i) % this.bufferLength;
      for (let channel = 0; channel < this.channelCount; channel += 1) {
        this.channelData[channel][writeIndex] = arraySequence[channel][i];
      }
    }

    this.writeIndex += sourceLength;
    if (this.writeIndex >= this.bufferLength) {
      this.writeIndex = 0;
    }

    // Cut the excessive frames off
    this.availableFramesCount += sourceLength;
    if (this.availableFramesCount > this.bufferLength) {
      this.availableFramesCount = this.bufferLength;
    }
  }

  public pull(arraySequence: Float32Array[]) {
    if (this.availableFramesCount === 0) { return; }

    const destinationLength = arraySequence[0].length;
    for (let i = 0; i < destinationLength; i += 1) {
      const readIndex = (this.readIndex + i) % this.bufferLength;
      for (let channel = 0; channel < this.channelCount; channel += 1) {
        arraySequence[channel][i] = this.channelData[channel][readIndex];
      }
    }

    this.readIndex += destinationLength;
    if (this.readIndex >= this.bufferLength) {
      this.readIndex = 0;
    }

    this.availableFramesCount -= destinationLength;
    if (this.availableFramesCount < 0) {
      this.availableFramesCount = 0;
    }
  }
}
