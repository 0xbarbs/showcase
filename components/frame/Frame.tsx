import { useState } from "react";

import { ButtonContainer, FrameImage } from "@/components/frame";
import { FrameData } from "@/types/frame";
import { FrameControls } from "@/components/frame/FrameControls";
import { FrameExport } from "@/components/frame/FrameExport";

export function Frame() {
  const [frameData, setFrameData] = useState<Record<number, FrameData>>({});
  const [activeFrame, setActiveFrame] = useState(0);

  const frameCount = Object.keys(frameData).length;
  const activeFrameData = frameData[activeFrame];

  return (
    <div className="flex flex-col relative">
      <h1 className="text-center mb-2 font-bold">
        {frameCount > 0 ? `Frame ${activeFrame + 1}` : "Frame 1"}
      </h1>

      <FrameControls
        activeFrame={activeFrame}
        setActiveFrame={setActiveFrame}
        activeFrameData={activeFrameData}
        isLastFrame={activeFrame === frameCount - 1}
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

      {frameCount > 0 && (
        <FrameExport frameData={frameData} />
      )}
    </div>
  )
}