import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ImagePreview } from "@/components/frame/ImagePreview";
import { useToast } from "@/components/ui/use-toast";
import { MAX_FILE_SIZE } from "@/lib/constants";

export function FrameImage({
  form
}: {
  form: UseFormReturn;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  return (
    <>
      <ImagePreview
        image={selectedImage}
        onClick={() => imageInput.current?.click()}
      />
      <FormField
        control={form.control}
        name="image"
        render={({field: {value, onChange, ...fieldProps}}) => (
          <FormItem>
            <FormLabel className="hidden">Picture</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                ref={imageInput}
                placeholder="Picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    const file = event.target.files[0];
                    const fileSizeInBytes = file.size;
                    const fileSizeInKb = Math.ceil(fileSizeInBytes / 1024);
                    const maxFileSizeInKb = Math.ceil(MAX_FILE_SIZE / 1024);

                    if (fileSizeInBytes > MAX_FILE_SIZE) {
                      toast({
                        variant: "destructive",
                        title: "Invalid Image",
                        description: `Your image size (${fileSizeInKb}Kb) exceeds the maximum size of ${maxFileSizeInKb}Kb.`,
                      })
                      return;
                    }

                    onChange(file);
                    setSelectedImage(file);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}