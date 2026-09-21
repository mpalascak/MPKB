import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const source = await readFile(path.join(process.cwd(), "dist", "sw.js"), "utf8");
  return new Response(source, { headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate", "Service-Worker-Allowed": "/" } });
}
