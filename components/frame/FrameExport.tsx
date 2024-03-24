import axios from "axios";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { FrameData } from "@/types/frame";

export function FrameExport({
  frameData
}: {
  frameData: Record<number, FrameData>
}) {
  const [exported, setExported] = useState(false);

  async function getDownload() {
    const blob = await axios.post('api/export', frameData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    const url = window.URL.createObjectURL(blob.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = "gitshowcase.zip"
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <div className="flex flex-col">
      <Button onClick={getDownload} variant="outline" className="mt-6">
        <FaDownload className="mr-2" />
        Export frame files
      </Button>

      {exported && (
        <p className="mt-4 max-w-[500px] text-center self-center text-sm">
          Frames exported! Extract the contents into a <span className="font-bold">.gitshowcase</span> directory located at the root of your repository. Don't forget to commit and push.
        </p>
      )}
    </div>
  )
}