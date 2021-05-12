import Link from 'next/link'
import { useCallback, useEffect, useRef } from "react";
import { AudioWorklet } from "audio-worklet";
import { AudioContext, AudioWorkletNode } from "standardized-audio-context";

const Home: React.FC = () => {
  const contextRef = useRef<AudioContext | null>(null);

  const handleButtonClick = useCallback(() => {
    if (contextRef.current === null) { return; }

    contextRef.current.resume();
  }, [1]);

  useEffect(() => {
    const audioContext = new AudioContext();
    audioContext.audioWorklet?.addModule(
      new AudioWorklet(new URL("../src/processor.worklet", import.meta.url))
    ).then(_ => {
      if (!AudioWorkletNode) { throw "What?"; }
      contextRef.current = audioContext;
      const workletNode = new AudioWorkletNode(audioContext, "processor");
      console.info("Loaded worklet processor successfully!", workletNode);
    }).catch(reason => {
      console.error("Failed to load worklet with", reason);
    });

    return () => {
      contextRef.current?.suspend();
      contextRef.current = null;
    };
  }, [1]);

  return (<>
    <button onClick={handleButtonClick}>
      Click Me!
    </button>
    <ul>
      <li>
        <Link href="/a" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
  </>)
};


export default Home;
