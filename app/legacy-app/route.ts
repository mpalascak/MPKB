import { readFile } from "node:fs/promises";
import path from "node:path";
import {requireApproved} from "../../lib/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const access=await requireApproved();
  if(!access)return Response.json({error:"Přístup není schválený."},{status:403,headers:{"Cache-Control":"private, no-store"}});
  const source = (await Promise.all(["app.js", "cloud-sync.js"].map(file => readFile(path.join(process.cwd(), "dist", file), "utf8")))).join("\n");
  return new Response(source, { headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "private, no-store" } });
}
