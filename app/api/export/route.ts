import { NextRequest, NextResponse } from "next/server";
import { ButtonData, FrameData } from "@/types/frame";
import { VALID_IMAGE_MIME_TYPES } from "@/lib/constants";

export const POST = async (req: NextRequest) => {
  const frames = await parseFormData(req);
  const AdmZip = require("adm-zip");
  const zip = new AdmZip();

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const buffer = Buffer.from(await frame.image.arrayBuffer());

    if (!VALID_IMAGE_MIME_TYPES.includes(frame.image.type)) {
      return NextResponse.json({
        message: "invalid image type "
      }, {
        status: 400,
      })
    }

    const name = `.gitshowcase/images/${i}.png`
    zip.addFile(name, buffer);

    // @ts-ignore
    frames[i].image = name;
  }

  zip.addFile(".gitshowcase/config.json", Buffer.from(JSON.stringify(frames, null, 2), "utf8"));

  return new NextResponse(zip.toBuffer(), {
    headers: {
      "Content-Disposition": "attachment; filename=gitshowcase.zip",
      "Content-Type": "application/zip",
    }
  })
}

// hmm, gotta be a better way?
const parseFormData = async (req: Request) => {
  const frames: FrameData[] = [];
  const formData = await req.formData();
  const formDataArray = Array.from(formData);

  for (const [name, value] of formDataArray) {
    const keys = name.split('[').map(key => key.replace(']', ''));

    for (let i = 0; i < keys.length - 1; i++) {
      const frameIndex = parseInt(keys[0]);
      const frameField = keys[1];

      if (!frames[frameIndex]) {
        frames[frameIndex] = {} as FrameData;
      }

      switch (frameField) {
        case "image":
          frames[frameIndex].image = value as File;
          break;
        case "buttons":
          const buttonIndex = parseInt(keys[2]);
          const buttonField = keys[3];

          if (!frames[frameIndex].buttons) {
            frames[frameIndex].buttons = [] as ButtonData[];
          }
          if (!frames[frameIndex].buttons[buttonIndex]) {
            frames[frameIndex].buttons[buttonIndex] = {} as ButtonData;
          }

          if (buttonField === "label") {
            frames[frameIndex].buttons[buttonIndex][buttonField] = (value as string)
              .replace("->", "→")
              .replace("<-", "←");
          } else {
            // @ts-ignore
            frames[frameIndex].buttons[buttonIndex][buttonField] = value;
          }
      }
    }
  }

  return frames;
}