import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MP Knowledge Base",
    short_name: "MP KB",
    description: "Osobní studijní databáze enterprise infrastruktury pro SDM a PM.",
    lang: "cs",
    start_url: "/#dashboard",
    display: "standalone",
    background_color: "#f3f7fa",
    theme_color: "#087fc5",
  };
}
