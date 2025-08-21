// app/api/repos/route.ts
import { NextResponse } from "next/server";
import { fetchReposByStack } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stack = searchParams.get("stack") || "javascript";

  try {
    const repos = await fetchReposByStack(stack);
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
