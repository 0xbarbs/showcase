import { FaPlus } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export function FrameButton() {
  return (
    <Button className="flex-1">
      <FaPlus className="mr-1" />
      Add button
    </Button>
  )
}