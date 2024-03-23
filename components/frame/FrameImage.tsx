import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { ImagePreview } from "@/components/frame/ImagePreview";
import { useToast } from "@/components/ui/use-toast";
import { MAX_FILE_SIZE, VALID_IMAGE_MIME_TYPES } from "@/lib/constants";

export function FrameImage({
  image,
  onImageChanged,
}: {
  image: File | undefined;
  onImageChanged: (image: File) => void;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  return (
    <>
      <ImagePreview
        image={image}
        onClick={() => imageInput.current?.click()}
      />
      <Input
        ref={imageInput}
        placeholder="Picture"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            const file = event.target.files[0];
            const fileSizeInBytes = file.size;
            const maxFileSizeInKb = Math.ceil(MAX_FILE_SIZE / 1024);

            if (fileSizeInBytes > MAX_FILE_SIZE) {
              toast({
                variant: "destructive",
                title: "Invalid Image",
                description: `Your image exceeds the maximum size of ${maxFileSizeInKb}Kb.`,
              })
              return;
            }
            if (!VALID_IMAGE_MIME_TYPES.includes(file.type)) {
              toast({
                variant: "destructive",
                title: "Invalid Image",
                description: `Only .jpg, .jpeg and .png images are supported.`,
              })
              return;
            }

            onImageChanged(file);
          }
        }}
      />
    </>
  )
}