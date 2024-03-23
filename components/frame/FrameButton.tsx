import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Buttons, TargetButtons } from "@/components/frame/constants";
import { ButtonData, ButtonType } from "@/types/frame";

export function FrameButton({
  data,
  onSave,
  onMoveLeft,
  canMoveLeft = false,
  onMoveRight,
  canMoveRight = false,
  onDelete,
}: {
  data: ButtonData;
  onSave: (data: ButtonData) => void;
  onMoveLeft?: () => void;
  canMoveLeft?: boolean;
  onMoveRight?: () => void;
  canMoveRight?: boolean;
  onDelete?: () => void;
}) {
  const [label, setLabel] = useState<string>(data.label);
  const [type, setType] = useState<ButtonType>(data.type);
  const [target, setTarget] = useState<string>(data.target || "");

  const isAddButton = data.type === ButtonType.Add;

  const handleSave = () => {
    onSave({
      type,
      label,
      target,
    });
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setLabel(data.label);
      setType(data.type)
      setTarget(data.target || "");
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant={isAddButton ? "default" : "secondary"} className="flex-1 ms-2">
          {isAddButton ? (
            <>
              <FaPlus className="mr-1" />
              Add Button
            </>
          ) : data.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={label}
                className="col-span-2 h-8"
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue={data.type !== ButtonType.Add ? data.type : undefined} onValueChange={(value) => setType(value as ButtonType)}>
                <SelectTrigger id="type" className="col-span-2 h-8">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Buttons.map((button) => (
                    <SelectItem value={button.type}>{button.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {type && TargetButtons.includes(type) && (
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  value={target}
                  className="col-span-2 h-8"
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
            )}

            <div className="mt-2 flex items-center">
              {!isAddButton && (
                <>
                  <PopoverClose asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 mr-2"
                      onClick={onDelete}
                    >
                      <Trash2 color="red" className="h-4 w-4" />
                    </Button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={onMoveLeft}
                      disabled={!canMoveLeft}
                      className="w-6 h-8 mr-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={onMoveRight}
                      disabled={!canMoveRight}
                      className="w-6 h-8 mr-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PopoverClose>
                </>
              )}

              <PopoverClose asChild>
                <Button
                  className="flex-1 h-8"
                  onClick={handleSave}
                  disabled={label == "" || type == null || type == ButtonType.Add || (TargetButtons.includes(type) && target == "")}
                >
                  Save changes
                </Button>
              </PopoverClose>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}