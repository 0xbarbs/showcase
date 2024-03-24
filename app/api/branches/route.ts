import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest) => {
  const {searchParams} = new URL(req.url);
  const user = searchParams.get("user");
  const repo = searchParams.get("repo");

  if (!user || !repo) {
    return NextResponse.json({ message: "missing user or repo param" }, {
      status: 400,
    })
  }

  try {
    const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/branches?per_page=100&page=1`, {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${process.env.GITHUB_API_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    return NextResponse.json(response.data.map((branch: any) => branch.name));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "failed to get branches" }, {
      status: 500,
    })
  }
}