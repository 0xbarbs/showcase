import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoBuild } from "react-icons/io5";
import { LinkGenerator } from "@/components/home/LinkGenerator";

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen flex justify-center items-center flex-col py-32 px-4">
      <h1 className="text-5xl font-bold">Git Showcase</h1>
      <p className="text-center max-w-[700px] mt-4 text-lg">
        A no code solution to quickly turn any public GitHub repository into an interactive frame, allowing creators to
        showcase the key features of their project with ease.
      </p>
      <p className="mt-4 text-lg font-bold">It's as easy as 1-2-3.</p>

      <section className="mt-16 pl-14 relative">
        <div className="absolute left-0 bg-green-800 text-white py-2 px-4 rounded-full text-xl font-bold">1</div>

        <h2 className="mt-1 text-2xl max-w-[600px] md:w-full font-bold">Create your frame</h2>
        <p className="text-lg mt-2">Use our simple interactive frame builder to create your showcase.</p>

        <Link href="/create" target="_blank" rel="noopener">
          <Button className="mt-4"><IoBuild size={18} className="mr-2" /> Open Frame Builder</Button>
        </Link>
      </section>
      <section className="mt-12 pl-14 relative">
        <div className="absolute left-0 bg-green-800 text-white py-2 px-4 rounded-full text-xl font-bold">2</div>

        <h2 className="mt-1 text-2xl max-w-[600px] md:w-full font-bold">Commit and push</h2>
        <p className="text-lg mt-2 max-w-[600px]">Download your frame export and unzip the contents into the root of
          your repository. Commit and push the new directory.</p>
      </section>
      <section className="mt-12 pl-14 relative">
        <div className="absolute left-0 bg-green-800 text-white py-2 px-4 rounded-full text-xl font-bold">2</div>

        <h2 className="mt-1 text-2xl max-w-[600px] md:w-full font-bold">Generate your frame link</h2>
        <p className="text-lg mt-2 max-w-[600px]">That's it! Paste your GitHub repository link below to create your shareable showcase frame link.</p>

        <LinkGenerator />
      </section>
    </main>
  )
}
