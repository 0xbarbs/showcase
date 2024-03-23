import { Dispatch, SetStateAction } from "react";
import { FaSquareCaretLeft, FaSquareCaretRight, FaSquarePlus } from "react-icons/fa6";

import { FrameData } from "@/types/frame";

export function FrameControls({ isLastFrame, activeFrame, setActiveFrame, activeFrameData }: {
  isLastFrame: boolean;
  activeFrame: number;
  setActiveFrame: Dispatch<SetStateAction<number>>;
  activeFrameData: FrameData | undefined;
}) {
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

      {activeFrameData?.image && (
        <button
          onClick={() => setActiveFrame(a => a + 1)}
          style={{
            position: "absolute",
            right: -64,
            top: '40%',
          }}
        >
          {isLastFrame ? (
            <FaSquarePlus size={40} />
          ) : (
            <FaSquareCaretRight size={40} />
          )}
        </button>
      )}
    </>
  )
}