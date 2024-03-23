"use client";

import { useState } from "react";

import { Frame } from "@/components/frame";
import { FrameData } from "@/types/frame";

export default function Home() {
  const [frameData, setFrameData] = useState<Record<number, FrameData>>({});
  const [activeFrame, setActiveFrame] = useState(0);

  const onSubmit = (data: any) => {
    console.log({ data: data.image });

    setFrameData(f => ({ ...f, [activeFrame]: data }));
  }

  return (
    <main className="flex w-screen h-screen justify-center items-center">
      <Frame
        onSubmit={onSubmit}
        data={frameData[activeFrame]}
      />
    </main>
  )
}
