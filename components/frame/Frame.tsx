import { useState } from "react";

import { ButtonContainer, FrameImage } from "@/components/frame";
import { FrameData } from "@/types/frame";
import { FrameControls } from "@/components/frame/FrameControls";

export function Frame() {
  const [frameData, setFrameData] = useState<Record<number, FrameData>>({});
  const [activeFrame, setActiveFrame] = useState(0);

  const activeFrameData = frameData[activeFrame];

  return (
    <div className="flex flex-col relative">
      <p>{activeFrame}</p>

      <FrameControls
        activeFrame={activeFrame}
        setActiveFrame={setActiveFrame}
        activeFrameData={activeFrameData}
        isLastFrame={activeFrame === Object.keys(frameData).length - 1}
      />

      <FrameImage
        image={activeFrameData?.image}
        onImageChanged={(image) => {
          setFrameData(f => ({
            ...f,
            [activeFrame]: {
              ...activeFrameData,
              image,
            }
          }));
        }}
      />
      <ButtonContainer
        buttons={activeFrameData?.buttons || []}
        onButtonsChanged={(buttons) => {
          setFrameData(f => ({
            ...f,
            [activeFrame]: {
              ...activeFrameData,
              buttons,
            }
          }));
        }}
      />
    </div>
  )
}