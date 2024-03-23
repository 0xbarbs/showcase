import { FaSquarePlus } from "react-icons/fa6";

export function ImagePreview({
  image,
  onClick,
}: {
  image: any;
  onClick: () => void;
}) {


  return (
    <article
      onClick={onClick}
      className="border bg-white border-slate-400 flex flex-col justify-center items-center"
      style={{
        aspectRatio: "1.91 / 1",
        width: 600,
      }}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Frame image"
          className="w-full max-w-full max-h-full"
        />
      ) : (
        <>
          <FaSquarePlus size={32}/>

          <p className="mt-2">Click to select an image</p>
          <p className="text-sm text-slate-500">The recommended size is 1200x630 pixels</p>
        </>
      )}
    </article>
  )
}