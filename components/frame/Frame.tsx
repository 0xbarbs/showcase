import { FaSquareCaretLeft, FaSquareCaretRight } from "react-icons/fa6";

import { ButtonContainer, FrameImage } from "@/components/frame";
import { useState } from "react";
import { FrameData } from "@/types/frame";

export function Frame() {
  const [frameData, setFrameData] = useState<Record<number, FrameData>>({});
  const [activeFrame, setActiveFrame] = useState(0);

  return (
    <div className="flex flex-col relative">
      <p>{activeFrame}</p>

      <button
        onClick={() => setActiveFrame(a => a - 1)}
        style={{
          position: "absolute",
          left: -64,
          top: '35%',
        }}
      >
        <FaSquareCaretLeft size={48}/>
      </button>
      <button
        onClick={() => setActiveFrame(a => a + 1)}
        style={{
          position: "absolute",
          right: -64,
          top: '35%',
        }}
      >
        <FaSquareCaretRight size={48}/>
      </button>

      <FrameImage
        image={frameData[activeFrame]?.image}
        onImageChanged={(image) => {
          setFrameData(f => ({
            ...f,
            [activeFrame]: {
              ...f[activeFrame],
              image,
            }
          }));
        }}
      />
      <ButtonContainer
        buttons={frameData[activeFrame]?.buttons || []}
        onButtonsChanged={(buttons) => {
          setFrameData(f => ({
            ...f,
            [activeFrame]: {
              ...f[activeFrame],
              buttons,
            }
          }));
        }}
      />
    </div>
  )
}