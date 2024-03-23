import { useState } from "react";

import { FrameButton } from "@/components/frame";
import { ButtonData, ButtonType } from "@/types/frame";
import { shiftLeft, shiftRight } from "@/lib/utils";

export function ButtonContainer() {
  const [buttons, setButtons] = useState<ButtonData[]>([]);

  return (
    <div className="flex bg-white p-4 border-rad rounded-b-lg border border-slate-300 border-t-0">
      {buttons.map((buttonData, i) => (
        <FrameButton
          key={i}
          data={buttonData}
          onMoveLeft={() => setButtons(b => shiftLeft([...b], i))}
          canMoveLeft={i > 0}
          onMoveRight={() => setButtons(b => shiftRight([...b], i))}
          canMoveRight={i !== (buttons.length - 1)}
          onDelete={() => setButtons(b => b.filter((button, idx) => idx !== i))}
          onSave={(data) => {
            setButtons(b => b.map(
              (button, idx) => i !== idx ? button : data)
            )
          }}
        />
      ))}

      {buttons.length < 4 && (
        <FrameButton
          data={{
            label: "",
            type: ButtonType.Add,
          }}
          onSave={(data) => setButtons(b => [...b, data])}
        />
      )}
    </div>
  )
}