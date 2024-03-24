import { FaDownload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FrameData } from "@/types/frame";

export function FrameExport({
  frameData
}: {
  frameData: Record<number, FrameData>
}) {
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
  }

  return (
    <Button onClick={getDownload} variant="outline" className="mt-6">
      <FaDownload className="mr-2" />
      Export frame files
    </Button>
  )
}