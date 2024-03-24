"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import { isValidUrl } from "@/lib/utils";

export const LinkGenerator = () => {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const url = e.target.value;
    const regex = /github\.com\/([^/]+)\/([^/]+)/;

    const match = url.match(regex);
    if (match) {
      const user = match[1]; // Contains '{user}'
      const repo = match[2]; // Contains '{repo}'

      if (user && repo) {
        setUser(user);
        setRepo(repo);

        try {
          setLoading(true);
          const response = await axios.get(`/api/branches?user=${user}&repo=${repo}`)
          setBranches(response.data);
        } catch {
          setError("Failed to retrieve branches")
        } finally {
          setLoading(false);
        }
      }
    } else if (isValidUrl(url)) {
      setError("This is not a valid GitHub repository")
    }
  }

  return (
    <div className="mt-6">
      <Label htmlFor="url">Repository link</Label>
      <Input
        id="url"
        type="text"
        onChange={onChange}
        placeholder="https://github.com/{user}/{repository}"
      />
      {error && (
        <p className="text-xs mt-1 text-red-600">{error}</p>
      )}

      {branches.length > 0 && (
        <Select onValueChange={(value) => setBranch(value)}>
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Select a branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {branches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {loading && (
        <Loader2 className="h-4 w-4 animate-spin mt-4" />
      )}

      {user && repo && branch && (
        <>
          <hr className="mt-6" />
          <p className="flex items-center mt-8 rounded-lg font-bold p-3 bg-slate-800 text-white font text-sm">
            <Button
              size="icon"
              variant="ghost"
              className="mr-2"
              onClick={() => {
                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/api/frame/${user}/${repo}/${branch}`)
              }}
            >
              <FaCopy size={20}/>
            </Button>

            {process.env.NEXT_PUBLIC_URL}/api/frame/{user}/{repo}/{branch}
          </p>
        </>
      )}
    </div>
  )
}