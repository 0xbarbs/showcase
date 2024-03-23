import { Dispatch, SetStateAction } from "react";
import { HiLightBulb } from "react-icons/hi";
import { FaSquareCaretLeft, FaSquareCaretRight, FaSquarePlus } from "react-icons/fa6";

import { ButtonType, FrameData } from "@/types/frame";
import { MAX_FRAME_COUNT } from "@/lib/constants";

export function FrameControls({ isLastFrame, activeFrame, setActiveFrame, activeFrameData }: {
  isLastFrame: boolean;
  activeFrame: number;
  setActiveFrame: Dispatch<SetStateAction<number>>;
  activeFrameData: FrameData | undefined;
}) {
  const hasNextFrameButton = activeFrameData?.buttons?.some(b => b.type === ButtonType.NextFrame);

  return (
    <>
      {activeFrame > 0 && (
        <button
          onClick={() => setActiveFrame(a => a - 1)}
          style={{
            position: "absolute",
            left: -64,
            top: '40%',
          }}
        >
          <FaSquareCaretLeft size={40}/>
        </button>
      )}

      {activeFrameData?.image && activeFrame < (MAX_FRAME_COUNT - 1) && (
        <div
          style={{
            position: "absolute",
            right: -64,
            top: '40%',
          }}
        >
          {hasNextFrameButton ? (
            <button onClick={() => setActiveFrame(a => a + 1)}>
              {isLastFrame ? (
                <FaSquarePlus size={40}/>
              ) : (
                <FaSquareCaretRight size={40}/>
              )}
            </button>
          ) : (
            <div className="absolute -left-16 -mt-2 w-44 text-sm text-slate-500 flex flex-col items-center">
              <h4 className="flex items-center font-bold mb-1">
                <HiLightBulb size={24} className="mr-1" /> TIP
              </h4>
              <p className="text-center">Create a "Next frame" button to add a new frame!</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}