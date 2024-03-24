/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import axios from "axios";
import { ButtonType, FrameData } from "@/types/frame";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";

const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  imageOptions: {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Radio Canada',
        weight: 400,
        source: 'google',
      },
      {
        name: 'Radio Canada',
        weight: 600,
        source: 'google',
      },
    ],
  },
})

const getRawBaseUrl = (user: string, repo: string, branch: string) => {
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/.gitshowcase`;
}

app.frame('/:user/:repo/:branch', async (c) => {
  const frameIndex = parseInt(c.buttonValue || "0");
  const user = c.req.param("user");
  const repo = c.req.param("repo");
  const branch = c.req.param("branch");
  const url = getRawBaseUrl(user!, repo!, branch!);

  if (!user || !repo || !branch) {
    return ErrorFrameHandler(c);
  }

  const test = await axios.get(`${url}/config.json`);
  const frames = test.data as FrameData[];

  return c.res({
    image: `${url}/${frames[frameIndex].image}`,
    intents: frames[frameIndex].buttons.map(({ label, type, target }) => {
      switch (type) {
        case ButtonType.NextFrame:
          return <Button value={`${frameIndex + 1}`}>{label}</Button>;
        case ButtonType.PreviousFrame:
          return <Button value={`${frameIndex - 1}`}>{label}</Button>;
        case ButtonType.Mint:
          return <Button.Mint target={target!}>{label}</Button.Mint>;
        case ButtonType.Link:
          return <Button.Link href={target!}>{label}</Button.Link>;
      }
    }),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
