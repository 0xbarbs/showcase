import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { FrameData } from "@/types/frame";
import { MAX_FILE_SIZE, VALID_IMAGE_MIME_TYPES } from "@/lib/constants";
import { FrameImage } from "@/components/frame/FrameImage";

export function Frame({
  data,
  onSubmit
}: {
  data: FrameData;
  onSubmit: SubmitHandler<FieldValues>;
}) {


  const FormSchema = z.object({
    image: z.any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 256KB.`)
      .refine((file) => VALID_IMAGE_MIME_TYPES.includes(file?.type), "Only .jpg, .jpeg and .png formats are supported."),
  })

  const form = useForm({
    resolver: zodResolver(FormSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FrameImage form={form} />
      </form>
    </Form>
  )
}