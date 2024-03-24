import { FrameButton } from "@/components/frame";
import { ButtonData, ButtonType } from "@/types/frame";
import { shiftLeft, shiftRight } from "@/lib/utils";
import { Buttons, UniqueButtons } from "@/components/frame/constants";

export function ButtonContainer({
  buttons,
  onButtonsChanged,
}: {
  buttons: ButtonData[]
  onButtonsChanged: (buttons: ButtonData[]) => void;
}) {
  return (
    <div className="flex flex-wrap bg-white p-4 border-rad rounded-b-lg border border-slate-300 border-t-0">
      {buttons.map((buttonData, i) => (
        <FrameButton
          key={i}
          data={buttonData}
          onMoveLeft={() => onButtonsChanged(shiftLeft([...buttons], i))}
          canMoveLeft={i > 0}
          onMoveRight={() => onButtonsChanged(shiftRight([...buttons], i))}
          canMoveRight={i !== (buttons.length - 1)}
          onDelete={() => onButtonsChanged(buttons.filter((button, idx) => idx !== i))}
          buttonTypes={Buttons.filter(b =>
            !UniqueButtons.includes(b.type)
              || !buttons.some(b2 => b2.type === b.type && b2.type !== buttonData.type)
          )}
          onSave={(data) => {
            onButtonsChanged(buttons.map(
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
          buttonTypes={Buttons.filter(b =>
            !UniqueButtons.includes(b.type) || !buttons.some(b2 => b2.type === b.type)
          )}
          onSave={(data) => onButtonsChanged([...buttons, data])}
        />
      )}
    </div>
  )
}