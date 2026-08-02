import { NextResponse } from "next/server";
import type { Category, SamplePr } from "@/lib/types";

function categoryFor(path: string, patch: string): Category {
  const text = `${path}\n${patch}`.toLowerCase();
  if (/migration|alter table|prisma/.test(text)) return "migration";
  if (/email|phone|ssn|address/.test(text)) return "pii";
  if (/auth|session|permission|role/.test(text)) return "auth";
  if (/secret|token|credential|\.env/.test(text)) return "secrets";
  if (/package\.json|lock|dependabot/.test(text)) return "deps";
  if (/query|database|schema|sql/.test(text)) return "db";
  if (/performance|forEach\(async|select \*/.test(text)) return "performance";
  return "logic";
}
export async function GET(request: Request) {
  if (!process.env.GITHUB_TOKEN) return NextResponse.json({ error: "GitHub token is not configured" }, { status: 401 });
  const url = new URL(request.url).searchParams.get("url") ?? "";
  const match = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)\/?$/i);
  if (!match) return NextResponse.json({ error: "Enter a valid GitHub pull request URL" }, { status: 400 });
  const [, owner, repo, number] = match;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${number}/files`, { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" }, cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "GitHub could not load this PR" }, { status: 502 });
  const files = await response.json() as Array<{ filename: string; patch?: string }>;
  const pr: SamplePr = { files: files.map((file, index) => { const diff = file.patch ?? "Binary or oversized diff omitted by GitHub."; const category = categoryFor(file.filename, diff); return { path: file.filename, hunks: [{ id: `github-${index + 1}`, category, diff, riskReason: "Imported GitHub hunk; deterministic path and keyword rules determine risk." }] }; }) };
  return NextResponse.json({ pr });
}
