// app/api/repos/route.ts
import { NextResponse } from "next/server";
import { fetchReposByStack } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || "";
  const page= searchParams.get("page") || "";
  const per_page= searchParams.get("per_page") || "";
  const language = searchParams.get("lang") || "";
  const sort = (searchParams.get("sort") as "stars" | "forks" | "updated") || "stars";
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";
  try {
    const repos = await fetchReposByStack(keyword,language,sort,order,page,per_page);
    return NextResponse.json(repos);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
